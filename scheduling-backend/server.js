// server.js
const express = require('express');
const cors = require('cors');
// Bỏ route schedule cũ nếu không cần import nữa, hoặc giữ lại tùy bạn
// const scheduleRoutes = require('./routes/schedule'); 
const dataRoutes = require('./routes/data'); // Thêm dòng này
const curriculumRoutes = require('./routes/curriculum');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// app.use('/api/schedule', scheduleRoutes);
app.use('/api/data', dataRoutes);             // Sử dụng file data.js cho các đường dẫn /api/data
app.use('/api/curriculum', curriculumRoutes); // Sử dụng file curriculum.js cho /api/curriculum

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});