// src/data/mockData.js

// Dữ liệu giả cho các lớp học phần của Khóa 16 - Kì 10
export const initialCourses = [
  { id: 'CNTT16-01-1', khoa: 16, lop: 'CNTT 16-01', siSo: 44, ky: 10, maHocPhan: '07CCQIQTCDA', tenHocPhan: 'Quản trị dự án Công nghệ thông tin', instructorId: null },
  { id: 'CNTT16-01-2', khoa: 16, lop: 'CNTT 16-01', siSo: 44, ky: 10, maHocPhan: '00CCQQNTCN7', tenHocPhan: 'Thực tập CNTT: Thực tập doanh nghiệp', instructorId: null },
  { id: 'CNTT16-02-1', khoa: 16, lop: 'CNTT 16-02', siSo: 40, ky: 10, maHocPhan: '07CCQIQTCDA', tenHocPhan: 'Quản trị dự án Công nghệ thông tin', instructorId: 'GV002' },
  { id: 'CNTT16-02-2', khoa: 16, lop: 'CNTT 16-02', siSo: 40, ky: 10, maHocPhan: '00CCQQNTCN7', tenHocPhan: 'Thực tập CNTT: Thực tập doanh nghiệp', instructorId: null },
  { id: 'KHDMT16-01-1', khoa: 16, lop: 'KHDMT 16-01', siSo: 41, ky: 10, maHocPhan: 'CSC4002', tenHocPhan: 'Nhập môn dữ liệu', instructorId: null },
  { id: 'KHDMT16-01-2', khoa: 16, lop: 'KHDMT 16-01', siSo: 17, ky: 10, maHocPhan: '00CCQLLCT4', tenHocPhan: 'Lịch sử Đảng Cộng sản Việt Nam', instructorId: 'GV003' },
  { id: 'KHDMT16-01-3', khoa: 16, lop: 'KHDMT 16-01', siSo: 17, ky: 10, maHocPhan: 'CSC4002', tenHocPhan: 'Trực quan và Phân tích dữ liệu', instructorId: null },
];

// Dữ liệu giả cho danh sách giảng viên
export const initialInstructors = [
  { id: 'GV001', name: 'Giảng viên A' },
  { id: 'GV002', name: 'Giảng viên B' },
  { id: 'GV003', name: 'Giảng viên C' },
  { id: 'GV004', name: 'Giảng viên D' },
];