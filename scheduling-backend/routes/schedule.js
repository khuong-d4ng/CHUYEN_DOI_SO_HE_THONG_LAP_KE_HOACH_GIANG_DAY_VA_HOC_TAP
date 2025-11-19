// routes/schedule.js
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const db = require('../config/db');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-tkb', upload.single('tkbFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    let connection;
    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // --- THAY ĐỔI LỚN: Đọc sheet không cần header ---
        const dataAsArray = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        console.log(`Found ${dataAsArray.length} rows to process.`);

        connection = await db.getConnection();
        await connection.beginTransaction();

        for (const [index, row] of dataAsArray.entries()) {
            // --- ĐỌC DỮ LIỆU THEO VỊ TRÍ CỘT CỐ ĐỊNH ---
            // Cột A -> row[0], Cột B -> row[1], ...
            const className = row[0] ? String(row[0]).trim() : null;
            const subjectName = row[1] ? String(row[1]).trim() : null;
            const credits = !isNaN(parseInt(row[2])) ? parseInt(row[2]) : 3; // Mặc định 3 tín chỉ nếu không có

            // Bỏ qua nếu dòng trống hoặc thiếu thông tin cơ bản
            if (!className || !subjectName) {
                console.warn(`Skipping row ${index + 1} due to missing Class Name or Subject Name.`);
                continue;
            }

            console.log(`Processing row ${index + 1}: Class='${className}', Subject='${subjectName}'`);

            const studentCount = 0; // Tạm thời mặc định là 0 vì file không có sĩ số
            const termId = 1;       // Tạm thời hardcode

            // Tìm hoặc tạo Subject (Học phần) DỰA TRÊN TÊN
            let [subjects] = await connection.execute('SELECT id FROM Subjects WHERE name = ?', [subjectName]);
            let subjectId;
            if (subjects.length === 0) {
                const [result] = await connection.execute(
                    'INSERT INTO Subjects (name, credits) VALUES (?, ?)',
                    [subjectName, credits]
                );
                subjectId = result.insertId;
            } else {
                subjectId = subjects[0].id;
            }

            // Tạo ClassSection (Lớp học phần)
            const [sectionResult] = await connection.execute(
                'INSERT INTO ClassSections (term_id, subject_id, class_name, student_count) VALUES (?, ?, ?, ?)',
                [termId, subjectId, className, studentCount]
            );
            const classSectionId = sectionResult.insertId;
            
            // Tạo Assignment trống
            await connection.execute(
                'INSERT INTO Assignments (class_section_id) VALUES (?)',
                [classSectionId]
            );

            // Bỏ qua việc insert vào ScheduleSlots vì không có dữ liệu
        }

        await connection.commit();
        await connection.release();

        res.status(200).send({ message: `Import successful! Processed valid rows.` });
    } catch (error) {
        console.error('Import failed:', error);
        if (connection) {
            await connection.rollback();
            await connection.release();
        }
        res.status(500).send({ message: 'Failed to import data.', error: error.message });
    }
});


// GET API lấy lịch dạy cho một kì học cụ thể
router.get('/term/:termId', async (req, res) => {
    try {
        const { termId } = req.params;
        const query = `
            SELECT cs.id, cs.class_name, cs.student_count, s.subject_code, s.name as subject_name,
                   i.instructor_code, i.full_name as instructor_name, ss.day_of_week, ss.start_period, 
                   ss.end_period, ss.room, ss.start_week, ss.end_week
            FROM ClassSections cs
            JOIN Subjects s ON cs.subject_id = s.id
            LEFT JOIN Assignments a ON cs.id = a.class_section_id
            LEFT JOIN Instructors i ON a.instructor_id = i.id
            LEFT JOIN ScheduleSlots ss ON a.id = ss.assignment_id
            WHERE cs.term_id = ? ORDER BY cs.class_name;
        `;
        const [rows] = await db.query(query, [termId]);
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch schedule:', error);
        res.status(500).send({ message: 'Failed to fetch schedule data.' });
    }
});

module.exports = router;