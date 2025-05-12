import React from 'react';
import './QuanLyThuMoi.css';
import { useEffect } from 'react';
import { FaPlus, FaPen, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThuMoiModal from './ThuMoiModal';
import SuaThuMoi from './SuaThuMoi';

function QuanLyThuMoi() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const fetchEntries = () => {
        fetch('https://song-dao-backend.onrender.com/thumoi/entry')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => {
                    const first = parseInt(a.id.substring(0, 8), 16);
                    const latest = parseInt(b.id.substring(0, 8), 16);
                    return latest - first;
                });
                setEntries(sortedData);
            })
            .catch(error => console.error('Error fetching entries:', error));
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("chắc chắn muốn xóa thư này không?")) {
            fetch(`https://song-dao-backend.onrender.com/thumoi/entry/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        alert('thư mời đã bị xóa.');
                        fetchEntries();
                    } else {
                        alert('không xóa được :(');
                    }
                })
                .catch(error => {
                    console.error('Error deleting entry:', error);
                });
        }
    };

    return (
        <div className="quan-ly-thu-moi-container">
            <div className="content-container">
                <div className="select-container">
                    <div className="go-back-container">
                        <button className="go-back-btn" onClick={() => navigate('/admin')}>
                            <FaArrowLeft size={15} className="add-icon" /> quay lại
                        </button>
                    </div>

                    <div className="edit-thu-moi-banner">
                        thư mời
                        <span className="edit-thu-moi-sub-header">đưa lên, chỉnh sửa và xóa</span>

                        <div className="create-thu-moi-button-container">
                            <button className="create-new-entry-thu-moi-btn" onClick={() => setModalOpen(true)}>
                                <FaPlus size={15} className="add-icon" /> đưa lên thư mời
                            </button>
                            <ThuMoiModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmitSuccess={fetchEntries} />
                        </div>
                    </div>

                    <div className="entry-thu-moi-container">
                        {entries.length > 0 ? (
                            entries.map(entry => (
                                <div className="entry-thu-moi" key={entry.id} >
                                    <div className="entry-thu-moi-cover">
                                        <img
                                            src={`https://song-dao-backend.onrender.com/files/image/${entry.imageId}`}
                                        />
                                    </div>
                                    <div className="entry-thu-moi-info">
                                        {entry.title}
                                        <div className="btn-thu-moi-container">
                                            <button onClick={() => { setSelectedEntry(entry); setEditModalOpen(true) }} className="sua-thu-moi-btn">sửa <FaPen size={15} className="sua-thu-moi-icon" /></button>
                                            <button onClick={() => handleDelete(entry.id)} className="xoa-thu-moi-btn">xóa <FaTrash size={15} className="xoa-thu-moi-icon" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Chưa có thư mời nào.</p>
                        )}
                    </div>
                    <SuaThuMoi isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} entryData={selectedEntry} onEditSuccess={fetchEntries} />
                </div>
            </div>
            <div className="footer-thongtin">
                <div className="copyright-thongtin">
                    © Cộng Đồng Thánh Micae - Tổng Giáo Phận Paderborn & Essen
                </div>
                <div className="year-thongtin">
                    2025
                </div>
            </div>
        </div>
    );
}

export default QuanLyThuMoi;