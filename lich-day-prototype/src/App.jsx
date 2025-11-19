// src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DndContext, DragOverlay } from '@dnd-kit/core';

import Sidebar from './components/Sidebar';
import CurriculumTable from './components/CurriculumTable';
import InstructorPanel from './components/InstructorPanel';
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
    // State cho dữ liệu nền tảng
    const [majors, setMajors] = useState([]);
    const [cohorts, setCohorts] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [instructors, setInstructors] = useState([]);

    // State cho lựa chọn của người dùng
    const [selectedMajorId, setSelectedMajorId] = useState(null);
    const [selectedCohortId, setSelectedCohortId] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);

    // State cho dữ liệu chính và trạng thái tải
    const [classSections, setClassSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeInstructor, setActiveInstructor] = useState(null);

    // Fetch dữ liệu nền tảng (sidebar và giảng viên) khi component mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [majorsRes, cohortsRes, instructorsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/data/majors`),
                    axios.get(`${API_BASE_URL}/data/cohorts`),
                    axios.get(`${API_BASE_URL}/data/instructors`)
                ]);
                setMajors(majorsRes.data);
                setCohorts(cohortsRes.data);
                setInstructors(instructorsRes.data.map(inst => ({ ...inst, isAssigned: false })));
            } catch (error) {
                console.error("Failed to fetch initial data", error);
            }
        };
        fetchInitialData();
    }, []);

    // Fetch danh sách KÌ HỌC khi Ngành hoặc Khóa thay đổi
    useEffect(() => {
        const fetchSemesters = async () => {
            if (selectedMajorId && selectedCohortId) {
                try {
                    const params = { majorId: selectedMajorId, cohortId: selectedCohortId };
                    const response = await axios.get(`${API_BASE_URL}/data/semesters`, { params });
                    setSemesters(response.data);
                } catch (error) {
                    console.error("Failed to fetch semesters", error);
                    setSemesters([]);
                }
            }
        };
        fetchSemesters();
    }, [selectedMajorId, selectedCohortId]);

    // Fetch dữ liệu CHƯƠNG TRÌNH ĐÀO TẠO và tạo ra các LỚP HỌC PHẦN
    useEffect(() => {
        const generateClassSections = async () => {
            if (selectedMajorId && selectedCohortId && selectedSemester) {
                setIsLoading(true);
                setClassSections([]);
                try {
                    const params = { majorId: selectedMajorId, cohortId: selectedCohortId, semester: selectedSemester };
                    const response = await axios.get(`${API_BASE_URL}/curriculum`, { params });
                    const subjects = response.data;
                    const major = majors.find(m => m.id === selectedMajorId);

                    if (!major || subjects.length === 0) {
                        setClassSections([]);
                        return;
                    }

                    const classList = [`${major.major_code} - 01`, `${major.major_code} - 02`, `${major.major_code} - 03`];
                    
                    // Lặp qua classList trước, rồi tới subjects
                    const expandedRows = classList.flatMap((className) =>
                        subjects.map((subject) => ({
                            ...subject,
                            id: `${subject.subject_code}-${className}`,
                            className: className,
                            assignedInstructor: null
                        }))
                    );

                    setClassSections(expandedRows);
                } catch (error) {
                    console.error("Failed to fetch curriculum data", error);
                    setClassSections([]);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        generateClassSections();
    }, [selectedMajorId, selectedCohortId, selectedSemester, majors]);
    
    // Component hiển thị đơn giản cho giảng viên trong DragOverlay
    function InstructorOverlayItem({ instructor }) {
        if (!instructor) return null;
        return (
            <div className="instructor-item overlay">
                <div className="instructor-name">{instructor['Họ và tên']}</div>
                <div className="instructor-degree">{instructor['Học vị']}</div>
            </div>
        );
    }

    // === Xử lý khi bắt đầu kéo ===
    const handleDragStart = (event) => {
        const { active } = event;
        // Kiểm tra xem có phải đang kéo một giảng viên không
        if (active.id.toString().includes('instructor')) {
            setActiveInstructor(active.data.current?.instructor);
        }
    };

    // === CẬP NHẬT HÀM handleDragEnd ===
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) {
            setActiveInstructor(null);
            return;
        }
        const instructor = active.data.current?.instructor;
        if (!instructor) {
            setActiveInstructor(null);
            return;
        }

        // Check lớp có giảng viên chưa
        let previousRowId = null;
        const updatedSections = classSections.map(section => {
            if (section.assignedInstructor?.id === instructor.id) {
                previousRowId = section.id;
                return { ...section, assignedInstructor: null };
            }
            return section;
        });

        let finalSections = updatedSections;
        
        if (over.id.startsWith('row-')) {
            const targetRowId = over.id.replace('row-', '');
            const instructorInTargetCell = classSections.find(s => s.id === targetRowId)?.assignedInstructor;

            finalSections = updatedSections.map(section => {
                if (section.id === targetRowId) {
                    return { ...section, assignedInstructor: instructor };
                }
                return section;
            });
            updateInstructorStatus(instructor.id, true);
            if (instructorInTargetCell) {
                updateInstructorStatus(instructorInTargetCell.id, false);
            }
        } else if (over.id === 'instructor-panel-droppable') {
            updateInstructorStatus(instructor.id, false);
        }
        setClassSections(finalSections);

        // Dọn dẹp state activeInstructor sau khi đã xử lý xong
        setActiveInstructor(null);
    };

    const updateInstructorStatus = (instructorId, isAssigned) => {
        setInstructors(prevInstructors =>
            prevInstructors.map(inst =>
                inst.id === instructorId ? { ...inst, isAssigned } : inst
            )
        );
    };

    const handleMajorSelect = (majorId) => {
        setSelectedMajorId(majorId);
        setSelectedCohortId(null);
        setSelectedSemester(null);
        setClassSections([]);
        setSemesters([]);
    };
    
    const handleCohortSelect = (cohortId) => {
        setSelectedCohortId(cohortId);
        setSelectedSemester(null);
        setClassSections([]);
    };
    
    const selectedMajorObject = majors.find(m => m.id === selectedMajorId);
    const selectedCohortObject = cohorts.find(c => c.id === selectedCohortId);

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="app-container">
                <Sidebar 
                    majors={majors}
                    cohorts={cohorts}
                    semesters={semesters}
                    selectedMajor={selectedMajorId}
                    onMajorSelect={handleMajorSelect}
                    selectedCohort={selectedCohortId}
                    onCohortSelect={handleCohortSelect}
                    selectedSemester={selectedSemester}
                    onSemesterSelect={setSelectedSemester}
                />
                <main className="main-content">
                    <CurriculumTable 
                        classSections={classSections}
                        isLoading={isLoading}
                        selectedMajor={selectedMajorObject}
                        selectedCohort={selectedCohortObject}
                        selectedSemester={selectedSemester}
                    />
                </main>
                <InstructorPanel instructors={instructors} /> 
            </div>

            {/* === DRAG OVERLAYY === */}
            <DragOverlay>
                {activeInstructor ? <InstructorOverlayItem instructor={activeInstructor} /> : null}
            </DragOverlay>
        </DndContext>
    );
}

export default App;