import React, { useState, useEffect } from 'react';
import './SuaThuGiaoXu.css';

const SuaThuGiaoXu = ({ isOpen, onClose, entryData, onEditSuccess }) => {
    const [title, setTitle] = useState('');
    const [pdf, setPdf] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (entryData) {
            setTitle(entryData.title);
        }
    }, [entryData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        if (pdf) formData.append('pdf', pdf);
        if (image) formData.append('image', image);

        try {
            const response = await fetch(`https://song-dao-backend.onrender.com/thugiaoxu/entry/${entryData.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('Cập nhật thành công!');
                onEditSuccess();
                onClose();
            } else {
                const err = await response.text();
                console.error('Error:', err);
                alert('Lỗi cập nhật!');
            }
        } catch (err) {
            console.error(err);
            alert('Không thể kết nối tới máy chủ.');
        }
    };

    if (!isOpen || !entryData) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <center>
                    <div className="header">
                        sửa thư giáo xứ
                        <button className="close-btn" onClick={onClose}>X</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-container">
                            <label>Tiêu đề</label>
                            <div className="space"></div>
                            <input
                                className="title-input"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <div className="space-between"></div>
                            <label>Chọn PDF mới (nếu cần thay đổi)</label>
                            <div className="space"></div>
                            <input className="file-upload" type="file" accept=".pdf" onChange={(e) => setPdf(e.target.files[0])} />

                            <div className="space-between"></div>
                            <label>Chọn hình mới (.jpg/.jpeg) (nếu cần thay đổi)</label>
                            <div className="space"></div>
                            <input className="file-upload" type="file" accept=".jpg, .jpeg" onChange={(e) => setImage(e.target.files[0])} />

                            <div className="space-between"></div>
                        </div>
                        <button className="submit-btn" type="submit">sửa</button>
                    </form>
                </center>
            </div>
        </div>
    );
};

export default SuaThuGiaoXu;