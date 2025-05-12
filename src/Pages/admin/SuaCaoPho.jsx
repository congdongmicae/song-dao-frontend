import React, { useState, useEffect } from 'react';

const SuaCaoPho = ({ isOpen, onClose, entryData, onEditSuccess }) => {
    const [title, setTitle] = useState('');
    const [birth, setBirth] = useState('');
    const [death, setDeath] = useState('');
    const [pdf, setPdf] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (entryData) {
            setTitle(entryData.title);
            setBirth(entryData.birth);
            setDeath(entryData.death);
        }
    }, [entryData]);

    const handleDateInputChange = (setter) => (e) => {
        const input = e.target.value;
        const cleaned = input.replace(/[^0-9.]/g, '').slice(0, 10);
        setter(cleaned);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('birth', birth);
        formData.append('death', death);
        if (pdf) formData.append('pdf', pdf);
        if (image) formData.append('image', image);

        try {
            const response = await fetch(`https://song-dao-backend.onrender.com/caopho/entry/${entryData.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('cáo phó đã được sửa.');
                onEditSuccess();
                onClose();
            } else {
                const err = await response.text();
                console.error('Error:', err);
                alert('Đã xảy ra lỗi.');
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
                        sửa cáo phó
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

                            <label>ngày sinh</label>
                            <div className="space"></div>
                            <input
                                className="title-input"
                                type="text"
                                value={birth}
                                onChange={handleDateInputChange(setBirth)}
                                placeholder="dd.MM.yyyy"
                                required
                            />
                            <div className="space-between"></div>

                            <label> ngày qua đời</label>
                            <div className="space"></div>
                            <input
                                className="title-input"
                                type="text"
                                value={death}
                                onChange={handleDateInputChange(setDeath)}
                                placeholder="dd.MM.yyyy"
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

export default SuaCaoPho;