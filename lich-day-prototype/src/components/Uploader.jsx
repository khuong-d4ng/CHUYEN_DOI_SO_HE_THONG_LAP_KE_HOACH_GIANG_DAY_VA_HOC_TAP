// src/components/Uploader.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Uploader = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage('Vui lòng chọn một file Excel.');
            return;
        }

        const formData = new FormData();
        formData.append('tkbFile', selectedFile);

        try {
            setMessage('Đang tải lên và xử lý...');
            const response = await axios.post('http://localhost:3001/api/schedule/upload-tkb', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            onUploadSuccess(); // Gọi hàm callback để tải lại dữ liệu
        } catch (error) {
            setMessage(error.response?.data?.message || 'Có lỗi xảy ra!');
            console.error(error);
        }
    };

    return (
        <div className="uploader-container">
            <h3>Import Thời Khóa Biểu</h3>
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
            <button onClick={handleUpload}>Tải lên</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Uploader;