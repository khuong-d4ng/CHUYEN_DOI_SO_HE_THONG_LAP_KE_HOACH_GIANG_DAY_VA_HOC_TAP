// src/components/InstructorPanel.jsx

import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';

const InstructorPanel = ({ instructors }) => {
    const { setNodeRef } = useDroppable({
        id: 'instructor-panel-droppable', // ID để nhận lại giảng viên
    });

    // Sắp xếp lại danh sách: giảng viên rảnh lên trên, bận xuống dưới
    const sortedInstructors = [...instructors].sort((a, b) => a.isAssigned - b.isAssigned);

    return (
        <div className="instructor-panel" ref={setNodeRef}>
            <h3>Danh sách giảng viên</h3>
            <div className="instructor-list">
                {sortedInstructors.length > 0 ? (
                    sortedInstructors.map((inst) => (
                        <DraggableInstructor key={inst.id} instructor={inst} />
                    ))
                ) : (
                    <p>Đang tải...</p>
                )}
            </div>
        </div>
    );
};


// Component cho từng mục giảng viên có thể kéo
function DraggableInstructor({ instructor }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `instructor-${instructor.id}`,
        data: { instructor },
    });

    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 999 } : undefined;
    
    // Thêm class 'assigned' nếu giảng viên đã được phân công
    const itemClassName = `instructor-item ${instructor.isAssigned ? 'assigned' : ''}`;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={itemClassName}>
            <div className="instructor-name">{instructor['Họ và tên']}</div>
            <div className="instructor-degree">
                {instructor['Học vị']}
                {instructor.isAssigned && <span className="status-badge"> - Bận</span>}
            </div>
        </div>
    );
}

export default InstructorPanel;