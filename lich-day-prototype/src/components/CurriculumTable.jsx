// src/components/CurriculumTable.jsx

import React from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';

// Component cho Giảng viên đã được gán (có thể kéo đi)
function AssignedInstructor({ instructor, sectionId }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `assigned-${instructor.id}-from-${sectionId}`,
        data: { instructor },
    });
    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="assigned-instructor">
            {instructor['Họ và tên']}
        </div>
    );
}

// Component cho một dòng có thể thả
const DroppableRow = ({ section, children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `row-${section.id}`,
    });
    const style = {
        backgroundColor: isOver ? '#d4edda' : undefined,
    };
    return <tr ref={setNodeRef} style={style}>{children}</tr>;
};


// =========================================================================
// ==> ĐANG LÀM
// =========================================================================
const CurriculumTable = ({ classSections, isLoading, selectedMajor, selectedCohort, selectedSemester }) => {
    // Thay thế "subjects" bằng "classSections"

    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>;
    }
    
    // Sử dụng classSections.length thay vì subjects.length 
    if (!selectedMajor || !selectedCohort || !selectedSemester || classSections.length === 0) {
        return <div>Vui lòng chọn đầy đủ Ngành / Khóa / Kì để xem dữ liệu.</div>;
    }

    return (
        <div className="course-table-container">
            <h2>
                Danh sách lớp học phần: {selectedMajor.name} - {selectedCohort.name} - Kì {selectedSemester}
            </h2>
            <div className="table-wrapper">
                <table className="course-table detailed-table">
                    <thead>
                        <tr>
                            <th>KHÓA</th>
                            <th>LỚP</th>
                            <th>SĨ SỐ</th>
                            <th>SĨ SỐ DỰ KIẾN</th>
                            <th>KỲ</th>
                            <th>KHOA</th>
                            <th>MÃ HỌC PHẦN</th>
                            <th>TÊN HỌC PHẦN</th>
                            <th>TÊN LỚP HỌC PHẦN</th>
                            <th>TỔNG TC</th>
                            <th>LÝ THUYẾT</th>
                            <th>THỰC HÀNH</th>
                            <th>TỔNG SỐ TIẾT</th>
                            <th>KHOA QUẢN LÝ HP</th>
                            <th>LOẠI PHÒNG</th>
                            <th>GIẢNG ĐƯỜỜNG</th>
                            <th>PHÒNG HỌC</th>
                            <th>ĐỐI TƯỢNG GIẢNG DẠY</th>
                            <th>TIẾT</th>
                            <th>BUỔI THỰC TẾ</th>
                            <th>THỨ</th>
                            <th>MÃ GIẢNG VIÊN</th>
                            <th>TÊN GIẢNG VIÊN</th>
                            <th>HỌC HÀM/HỌC VỊ</th>
                            <th>CHUYÊN MÔN</th>
                            <th>CH/TG</th>
                            <th>SỐ HỢP ĐỒNG</th>
                            <th>SỐ BẢO HIỂM</th>
                            <th>CCCD</th>
                            <th>HÌNH THỨC THI</th>
                            <th>THỜI GIAN THI</th>
                            <th>HÌNH THỨC HỌC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sử dụng classSections.map*/}
                        {classSections.map((section) => (
                            <DroppableRow key={section.id} section={section}>
                                <td>{selectedCohort?.name}</td>
                                <td>{section.className}</td>
                                <td></td>
                                <td></td>
                                <td>{selectedSemester}</td>
                                <td>{selectedMajor?.name}</td>
                                <td>{section.subject_code || 'N/A'}</td>
                                <td>{section.name}</td>
                                <td>{`${section.subject_code}_${section.className}`}</td>
                                <td>{section.credits}</td>
                                <td></td>
                                <td></td>
                                <td>{section.credits * 15}</td>
                                <td>{selectedMajor?.name}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{section.className}</td>
                                <td>5</td>
                                <td></td>
                                <td></td>

                                {/* CÁC CỘT ĐỘNG KÉO THẢ*/}
                                <td>{section.assignedInstructor ? section.assignedInstructor['Mã cán bộ'] : ''}</td>
                                <td>
                                    {section.assignedInstructor ? (
                                        <AssignedInstructor instructor={section.assignedInstructor} sectionId={section.id} />
                                    ) : (
                                        <span className="placeholder-text">Thả GV vào đây</span>
                                    )}
                                </td>
                                <td>{section.assignedInstructor ? (section.assignedInstructor['Học hàm'] || section.assignedInstructor['Học vị']) : ''}</td>
                                <td>{section.assignedInstructor ? section.assignedInstructor['Chuyên môn đào tạo'] : ''}</td>
                                
                                {/* Các cột trống chưa có thông tin */}
                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                            </DroppableRow>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CurriculumTable;