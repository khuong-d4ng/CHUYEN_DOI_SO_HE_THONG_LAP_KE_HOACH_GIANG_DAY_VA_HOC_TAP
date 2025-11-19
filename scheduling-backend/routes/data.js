// scheduling-backend/routes/data.js

const express = require('express');
const db = require('../config/db');
const router = express.Router();

// API lấy danh sách Ngành học
router.get('/majors', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, major_code FROM Majors ORDER BY name');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch majors', error });
    }
});

// API lấy danh sách Khóa học
router.get('/cohorts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name FROM Cohorts ORDER BY start_year DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cohorts', error });
    }
});

// API lấy danh sách Kì học
router.get('/semesters', async (req, res) => {
    const { majorId, cohortId } = req.query;
    if (!majorId || !cohortId) {
        return res.status(400).json({ message: 'Major and Cohort ID are required.' });
    }
    try {
        const query = `
            SELECT DISTINCT semester 
            FROM ProgramSubjects 
            WHERE major_id = ? AND cohort_id = ? AND semester IS NOT NULL 
            ORDER BY semester;
        `;
        const [rows] = await db.query(query, [majorId, cohortId]);
        const semesters = rows.map(row => row.semester);
        res.json(semesters);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch semesters', error });
    }
});


// =========================================================================
// ==> API ĐỂ LẤY DANH SÁCH GIẢNG VIÊN
// =========================================================================
// GET /api/data/instructors
router.get('/instructors', async (req, res) => {
    try {
        // Lấy các trường cần thiết để hiển thị. Lưu ý dùng dấu backtick (`) cho tên cột tiếng Việt
        const query = "SELECT id, `Mã cán bộ`, `Họ và tên`, `Học vị`, `Chức danh`, status FROM Instructors ORDER BY `Họ và tên`";
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Failed to fetch instructors:", error);
        res.status(500).json({ message: 'Failed to fetch instructors', error });
    }
});


module.exports = router;