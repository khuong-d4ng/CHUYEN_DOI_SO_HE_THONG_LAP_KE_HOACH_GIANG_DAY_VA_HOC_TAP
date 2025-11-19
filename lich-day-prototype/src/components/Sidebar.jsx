// src/components/Sidebar.jsx

import React from 'react';

const Sidebar = ({ 
    majors, cohorts, semesters,
    selectedMajor, onMajorSelect,
    selectedCohort, onCohortSelect,
    selectedSemester, onSemesterSelect
}) => {

    return (
        <div className="sidebar">
            {/* --- Chọn Ngành --- */}
            <h2>Ngành học</h2>
            <ul>
                {majors.map(major => (
                    <li 
                        key={major.id} 
                        className={selectedMajor === major.id ? 'active' : ''}
                        onClick={() => onMajorSelect(major.id)}
                    >
                        {major.name}
                    </li>
                ))}
            </ul>

            {/* --- Chọn Khóa (chỉ hiện khi đã chọn Ngành) --- */}
            {selectedMajor && (
                <>
                    <h2 style={{ marginTop: '20px' }}>Khóa học</h2>
                    <ul>
                        {cohorts.map(cohort => (
                            <li
                                key={cohort.id}
                                className={selectedCohort === cohort.id ? 'active' : ''}
                                onClick={() => onCohortSelect(cohort.id)}
                            >
                                {cohort.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* --- Chọn Kì (chỉ hiện khi đã chọn Khóa) --- */}
            {selectedCohort && (
                <>
                    <h2 style={{ marginTop: '20px' }}>Kì học</h2>
                    {semesters.length > 0 ? (
                        <ul>
                            {semesters.map(semester => (
                                 <li
                                    key={semester}
                                    className={selectedSemester === semester ? 'active' : ''}
                                    onClick={() => onSemesterSelect(semester)}
                                >
                                    Kì {semester}
                                </li>
                            ))}
                        </ul>
                    ) : <p>Đang tải danh sách kì...</p>}
                </>
            )}
        </div>
    );
};

export default Sidebar;