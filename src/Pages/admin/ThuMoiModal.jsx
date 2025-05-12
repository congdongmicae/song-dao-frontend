import React, { useState } from 'react';
import './ThuMoiModal.css';

const ThuMoiModal = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [title, setTitle] = useState('');
    const [pdf, setPdf] = useState(null);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('pdf', pdf);
        formData.append('image', image)

        try {
            const response = await fetch('https://song-dao-backend.onrender.com/thumoi/saveEntry', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.text();
                console.log('Upload successful:', result);
                alert('Tải lên thành công!');
                onClose();

                if (onSubmitSuccess) {
                    onSubmitSuccess()
                }
            } else {
                const error = await response.text();
                console.error('Upload failed:', error);
                alert('Đã xảy ra lỗi khi tải lên!');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Lỗi kết nối đến server.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <center>
                    <div className="header">
                        đưa lên thư mời
                        <button className="close-btn" type="button" onClick={onClose}>X</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-container">
                            <label>Tiêu đề </label>
                            <div className="space"></div>
                            <input
                                className="create-title-input"
                                type="text"
                                placeholder="Ngày 16 Tháng 10 2023"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <div className="space-between"></div>

                            <label>chọn thư mời (.pdf) </label>
                            <div className="space"></div>
                            <input
                                className="file-upload"
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setPdf(e.target.files[0])}
                                required
                            />
                            <div className="space-between"></div>

                            <label>chọn hình (.Jpg, .Jpeg) </label>
                            <div className="space"></div>
                            <input
                                className="file-upload"
                                type="file"
                                accept=".jpg, .jpeg"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                            <div className="space-between"></div>
                        </div>
                        <button className="submit-btn" type="submit">đưa lên</button>
                    </form>
                </center>
            </div>
        </div>
    );
};

export default ThuMoiModal;
