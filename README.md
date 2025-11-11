# 🎓 Hệ Thống Lập Lịch Giảng Dạy Tự Động

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql)](https://www.mysql.com/)

> Ứng dụng web hiện đại giúp số hóa và tối ưu hóa quy trình lập lịch giảng dạy tại các khoa đào tạo

## 📋 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng](#-tính-năng)
- [Kiến Trúc Hệ Thống](#-kiến-trúc-hệ-thống)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Cài Đặt](#-cài-đặt)
- [Hướng Dẫn Sử Dụng](#-hướng-dẫn-sử-dụng)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Đóng Góp](#-đóng-góp)
- [Roadmap](#-roadmap)
- [License](#-license)

## 🌟 Giới Thiệu

Hệ thống Lập Lịch Giảng Dạy là một ứng dụng web được phát triển nhằm **số hóa và tự động hóa** quy trình phân công giảng dạy tại các trường đại học. Thay vì sử dụng các công cụ phân mảnh như Excel, PDF và email, hệ thống cung cấp một **nền tảng tập trung** với giao diện trực quan, giúp:

- ✅ Quản lý chương trình đào tạo theo ngành, khóa và kỳ học
- ✅ Phân công giảng viên bằng giao diện kéo-thả (Drag & Drop)
- ✅ Kiểm tra xung đột lịch dạy tự động
- ✅ Đảm bảo tính nhất quán và toàn vẹn dữ liệu
- ✅ Giảm thiểu sai sót và tối ưu thời gian lập lịch

### 🎯 Mục Tiêu Dự Án

- Xây dựng **Single Source of Truth** cho dữ liệu đào tạo
- Cung cấp trải nghiệm người dùng **trực quan và dễ sử dụng**
- Đảm bảo **khả năng mở rộng** và bảo trì dễ dàng
- Tạo nền tảng cho việc tích hợp AI/ML trong tương lai

## ✨ Tính Năng

### 🔹 Phiên Bản Hiện Tại (Prototype v1.0)

#### Quản Lý Dữ Liệu
- 📚 Quản lý danh sách ngành học, khóa học, kỳ học
- 👨‍🏫 Quản lý thông tin giảng viên (học vị, chuyên môn, trạng thái)
- 📖 Quản lý chương trình đào tạo (môn học, tín chỉ, môn bắt buộc/tự chọn)

#### Lập Lịch Tương Tác
- 🎯 **Giao diện Drag & Drop**: Kéo-thả giảng viên vào lớp học phần
- 🔄 **Cập nhật realtime**: Trạng thái giảng viên tự động cập nhật (Rảnh/Bận)
- 📊 **Bộ lọc động**: Lọc theo Ngành → Khóa → Kỳ học
- 📋 **Hiển thị bảng chi tiết**: Xem đầy đủ thông tin lớp học phần

#### Trải Nghiệm Người Dùng
- ✨ Animation mượt mà với DragOverlay
- 📱 Responsive design - tương thích mọi thiết bị
- 🎨 Giao diện thân thiện, dễ học
- ⚡ Phản hồi tức thì với các thao tác

### 🚀 Tính Năng Sắp Triển Khai

- 💾 Lưu trữ dữ liệu bền vững (POST/PUT/DELETE APIs)
- ⚠️ Kiểm tra xung đột lịch dạy và phòng học
- ✏️ Chỉnh sửa trực tiếp (Inline editing) trên bảng
- 🔐 Xác thực người dùng (JWT Authentication)
- 👥 Phân quyền theo vai trò (Admin/Scheduler/Viewer)
- 📄 Xuất báo cáo (Excel, PDF)
- 📊 Dashboard thống kê và phân tích

## 🏗️ Kiến Trúc Hệ Thống

Hệ thống được xây dựng theo mô hình **3-Tier Architecture**:

```
┌─────────────────────────────────────────────────┐
│          Frontend Layer (ReactJS)               │
│  ┌─────────────┐  ┌──────────────────────────┐ │
│  │  Sidebar    │  │   CurriculumTable        │ │
│  │  Component  │  │   + Drag & Drop          │ │
│  └─────────────┘  └──────────────────────────┘ │
│  ┌─────────────────────────────────────────┐   │
│  │     InstructorPanel (Draggable)         │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↕ HTTP/REST API
┌─────────────────────────────────────────────────┐
│       Backend Layer (Node.js/Express)           │
│  ┌──────────────┐  ┌──────────────────────┐    │
│  │ data.js      │  │  curriculum.js       │    │
│  │ (Danh mục)   │  │  (Chương trình ĐT)   │    │
│  └──────────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────┘
                      ↕ MySQL2 Pool
┌─────────────────────────────────────────────────┐
│         Database Layer (MySQL 8.x)              │
│  ┌──────────────────────────────────────────┐  │
│  │  Majors | Cohorts | Subjects             │  │
│  │  Instructors | ProgramSubjects           │  │
│  │  ClassSections | Assignments             │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Đặc Điểm Kiến Trúc

- **Tách biệt Frontend - Backend**: Hai repository độc lập, dễ triển khai và mở rộng
- **RESTful API**: Giao tiếp qua HTTP với format JSON chuẩn
- **Connection Pool**: Tối ưu hiệu suất truy vấn database
- **Component-Based UI**: Tái sử dụng và bảo trì dễ dàng

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **React 18.x** - UI Framework
- **Vite** - Build tool & Dev server
- **@dnd-kit** - Drag and Drop functionality
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js 18.x** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver với Promise support
- **Multer** - File upload middleware
- **XLSX** - Excel file processing
- **CORS** - Cross-origin resource sharing

### Database
- **MySQL 8.x** - Relational database
- **Normalized Schema** (3NF) - Đảm bảo tính toàn vẹn dữ liệu

### DevOps & Tools
- **Git** - Version control
- **npm** - Package manager
- **Postman** - API testing

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống

- Node.js >= 18.0.0
- MySQL >= 8.0
- npm >= 9.0.0

### Bước 1: Clone Repository

```bash
# Clone dự án
git clone https://github.com/yourusername/teaching-schedule-system.git
cd teaching-schedule-system
```

### Bước 2: Cài Đặt Backend

```bash
# Di chuyển vào thư mục backend
cd scheduling-backend

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env

# Cấu hình database trong file .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=scheduling_db
DB_PORT=3306
```

### Bước 3: Khởi Tạo Database

```bash
# Import database schema và seed data
mysql -u root -p < database/schema.sql
mysql -u root -p scheduling_db < database/seeds.sql
```

### Bước 4: Cài Đặt Frontend

```bash
# Quay về thư mục gốc
cd ..

# Di chuyển vào thư mục frontend
cd scheduling-frontend

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env

# Cấu hình API endpoint
VITE_API_BASE_URL=http://localhost:3001/api
```

### Bước 5: Chạy Ứng Dụng

```bash
# Terminal 1 - Chạy Backend
cd scheduling-backend
npm start
# Backend chạy tại: http://localhost:3001

# Terminal 2 - Chạy Frontend
cd scheduling-frontend
npm run dev
# Frontend chạy tại: http://localhost:5173
```

🎉 Truy cập ứng dụng tại: **http://localhost:5173**

## 📖 Hướng Dẫn Sử Dụng

### 1. Chọn Bộ Lọc

1. Chọn **Ngành học** từ sidebar (VD: Công nghệ Thông tin)
2. Chọn **Khóa học** (VD: Khóa 19 - 2019)
3. Chọn **Kỳ học** (VD: Kỳ 1)

→ Hệ thống sẽ tự động tải danh sách lớp học phần

### 2. Phân Công Giảng Viên

1. Tìm giảng viên trong **panel bên phải**
2. **Kéo (drag)** tên giảng viên
3. **Thả (drop)** vào hàng lớp học phần mong muốn
4. Giảng viên sẽ được gắn nhãn **"Bận"** và tự động sắp xếp xuống dưới

### 3. Hủy Phân Công

- **Kéo** giảng viên đã được phân công từ bảng
- **Thả** vào panel giảng viên
- Trạng thái sẽ chuyển về **"Rảnh"**

### 4. Xem Thông Tin Chi Tiết

- Bảng hiển thị đầy đủ: Mã học phần, tên môn, số tín chỉ, giảng viên phụ trách, học vị...
- Cuộn ngang (scroll) để xem các cột bổ sung

## 📁 Cấu Trúc Dự Án

```
teaching-schedule-system/
│
├── scheduling-backend/          # Backend Node.js/Express
│   ├── config/
│   │   └── db.js               # MySQL connection pool
│   ├── routes/
│   │   ├── data.js             # API danh mục (majors, cohorts, instructors)
│   │   ├── curriculum.js       # API chương trình đào tạo
│   │   └── schedule.js         # API lịch dạy (legacy)
│   ├── server.js               # Entry point
│   ├── package.json
│   └── .env.example
│
├── scheduling-frontend/         # Frontend ReactJS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx            # Bộ lọc Ngành/Khóa/Kỳ
│   │   │   ├── CurriculumTable.jsx    # Bảng lớp học phần
│   │   │   ├── InstructorPanel.jsx    # Panel giảng viên
│   │   │   └── Uploader.jsx           # Upload file (legacy)
│   │   ├── App.jsx             # Main component
│   │   ├── App.css             # Global styles
│   │   └── main.jsx            # Entry point
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── database/                    # SQL scripts
│   ├── schema.sql              # Database structure
│   └── seeds.sql               # Sample data
│
└── README.md                   # Documentation
```

## 🔌 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 1. Lấy Danh Sách Ngành Học
```http
GET /data/majors
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Công nghệ Thông tin",
    "major_code": "CNTT"
  }
]
```

#### 2. Lấy Danh Sách Khóa Học
```http
GET /data/cohorts
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Khóa 19 - 2019"
  }
]
```

#### 3. Lấy Danh Sách Kỳ Học
```http
GET /data/semesters?majorId={id}&cohortId={id}
```

**Query Parameters:**
- `majorId` (required): ID ngành học
- `cohortId` (required): ID khóa học

**Response:**
```json
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```

#### 4. Lấy Danh Sách Giảng Viên
```http
GET /data/instructors
```

**Response:**
```json
[
  {
    "id": 1,
    "Mã cán bộ": "GV001",
    "Họ và tên": "Nguyễn Văn A",
    "Học vị": "Tiến sĩ",
    "Chức danh": "Giảng viên chính",
    "status": "active"
  }
]
```

#### 5. Lấy Chương Trình Đào Tạo
```http
GET /curriculum?majorId={id}&cohortId={id}&semester={num}
```

**Query Parameters:**
- `majorId` (required): ID ngành học
- `cohortId` (required): ID khóa học
- `semester` (required): Số kỳ học

**Response:**
```json
[
  {
    "subject_code": "IT101",
    "name": "Lập trình cơ bản",
    "credits": 3,
    "is_elective": 0,
    "elective_group": null
  }
]
```

## 🗄️ Database Schema

### Nhóm Bảng Danh Mục

#### Majors (Ngành học)
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| name | VARCHAR(255) | Tên ngành |
| major_code | VARCHAR(20) | Mã ngành |

#### Cohorts (Khóa học)
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| name | VARCHAR(100) | Tên khóa (VD: Khóa 19) |
| start_year | INT | Năm bắt đầu |

#### Subjects (Môn học)
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| subject_code | VARCHAR(20) | Mã môn học |
| name | VARCHAR(255) | Tên môn học |
| credits | INT | Số tín chỉ |

#### Instructors (Giảng viên)
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| Mã cán bộ | VARCHAR(20) | Mã giảng viên |
| Họ và tên | VARCHAR(255) | Họ tên đầy đủ |
| Học vị | VARCHAR(50) | Tiến sĩ/Thạc sĩ |
| Chuyên môn đào tạo | VARCHAR(255) | Chuyên môn |

### Nhóm Bảng Kế Hoạch

#### ProgramSubjects (Chương trình đào tạo)
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| major_id | INT | FK → Majors |
| cohort_id | INT | FK → Cohorts |
| subject_id | INT | FK → Subjects |
| semester | INT | Kỳ học (1-11) |
| is_elective | BOOLEAN | Môn tự chọn? |

### Nhóm Bảng Nghiệp Vụ

#### ClassSections (Lớp học phần)
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| term_id | INT | FK → Terms |
| subject_id | INT | FK → Subjects |
| class_name | VARCHAR(50) | Tên lớp (VD: CNTT-01) |
| student_count | INT | Sĩ số |

#### Assignments (Phân công giảng dạy)
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| class_section_id | INT | FK → ClassSections |
| instructor_id | INT | FK → Instructors |

## 🤝 Đóng Góp

Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng!

### Quy Trình Đóng Góp

1. **Fork** repository này
2. **Clone** về máy local
   ```bash
   git clone https://github.com/your-username/teaching-schedule-system.git
   ```
3. Tạo **branch mới** cho tính năng
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Commit** thay đổi
   ```bash
   git commit -m "Add: Amazing feature"
   ```
5. **Push** lên branch
   ```bash
   git push origin feature/amazing-feature
   ```
6. Tạo **Pull Request**

### Coding Standards

- Sử dụng **ESLint** cho JavaScript/React
- Tuân thủ **Airbnb Style Guide**
- Viết **comment rõ ràng** cho logic phức tạp
- Đặt tên **biến/hàm có ý nghĩa**

## 🗺️ Roadmap

### 📌 Phase 1: Persistence Layer (Q2 2024)
- [ ] Xây dựng API POST/PUT/DELETE cho Assignments
- [ ] Tích hợp lưu trữ bền vững cho phân công giảng viên
- [ ] Tạo lớp học phần tự động từ chương trình đào tạo

### 📌 Phase 2: Business Logic (Q3 2024)
- [ ] Kiểm tra xung đột lịch dạy (Server-side)
- [ ] Kiểm tra xung đột phòng học
- [ ] Xác thực dữ liệu đầu vào (Validation Layer)
- [ ] API lấy lịch dạy theo giảng viên/phòng/thời gian

### 📌 Phase 3: Advanced Features (Q4 2024)
- [ ] Inline editing cho bảng dữ liệu
- [ ] Xuất báo cáo Excel/PDF
- [ ] Dashboard thống kê (giờ dạy, phòng học, ...)
- [ ] Tìm kiếm và lọc nâng cao

### 📌 Phase 4: Security & Administration (Q1 2025)
- [ ] JWT Authentication
- [ ] Role-Based Access Control (RBAC)
- [ ] Giao diện quản lý người dùng
- [ ] Audit logs (lịch sử thay đổi)

### 📌 Phase 5: AI/ML Integration (Future)
- [ ] Gợi ý phân công giảng viên thông minh
- [ ] Phát hiện xung đột tiềm ẩn
- [ ] Tối ưu hóa phòng học tự động

## 📜 License

Dự án được phát hành dưới giấy phép **MIT License** - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Tác Giả

- Phạm Đăng Khương


**Giảng Viên Hướng Dẫn**
- TS. Lê Trung Hiếu

**Trường Đại Học Đại Nam** - Khoa CNTT

## 📞 Liên Hệ
---

<div align="center">


Made with ❤️ by Team XYZ

</div>
