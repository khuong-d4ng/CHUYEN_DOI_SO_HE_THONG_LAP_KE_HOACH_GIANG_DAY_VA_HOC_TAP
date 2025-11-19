// routes/curriculum.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

// API chính: Lấy chương trình đào tạo theo bộ lọc
// GET /api/curriculum?majorId=1&cohortId=2&semester=1
router.get('/', async (req, res) => {
    const { majorId, cohortId, semester } = req.query;

    if (!majorId || !cohortId || !semester) {
        // Trả về một mảng rỗng thay vì lỗi để giao diện không bị crash
        return res.json([]); 
    }

    try {
        const query = `
            SELECT 
                s.subject_code,
                s.name,
                s.credits,
                ps.is_elective,
                ps.elective_group
            FROM ProgramSubjects ps
            JOIN Subjects s ON ps.subject_id = s.id
            WHERE ps.major_id = ? AND ps.cohort_id = ? AND ps.semester = ?
            ORDER BY s.name;
        `;
        const [rows] = await db.query(query, [majorId, cohortId, semester]);
        res.json(rows);
    } catch (error) {
        console.error("Failed to fetch curriculum: ", error);
        res.status(500).json({ message: 'Failed to fetch curriculum', error });
    }
});

module.exports = router;