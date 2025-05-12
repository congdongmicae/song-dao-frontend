import React from 'react';
import './QuanLyThuGiaoXu.css';
import { useEffect } from 'react';
import { FaPlus, FaPen, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import ThuGiaoXuModal from './ThuGiaoXuModal';
import SuaThuGiaoXu from './SuaThuGiaoXu';
import { useNavigate } from 'react-router-dom';

function QuanLyThuGiaoXu() {
    const [modalOpen, setModalOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchEntries = () => {
        fetch('https://song-dao-backend.onrender.com/thugiaoxu/entry')
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
        if (window.confirm("Bạn chắc chắn muốn xóa thư này không?")) {
            fetch(`https://song-dao-backend.onrender.com/thugiaoxu/entry/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        alert('Xóa thành công!');
                        fetchEntries();
                    } else {
                        alert('Xóa thất bại.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting entry:', error);
                });
        }
    };

    return (
        <div className="quan-ly-container">
            <div className="content-container">
                <div className="select-container">
                    <div className="go-back-container">
                        <button className="go-back-btn" onClick={() => navigate('/admin')}>
                            <FaArrowLeft size={15} className="add-icon" /> quay lại
                        </button>
                    </div>

                    <div className="edit-thu-giao-xu-banner">
                        thư giáo xứ
                        <span className="edit-thu-giao-xu-sub-header">đưa lên, chỉnh sửa và xóa</span>

                        <div className="create-button-container">
                            <button className="create-new-entry-btn" onClick={() => setModalOpen(true)}>
                                <FaPlus size={15} className="add-icon" /> đưa lên thư giáo xứ
                            </button>
                            <ThuGiaoXuModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmitSuccess={fetchEntries} />
                        </div>
                    </div>

                    <div className="entry-container">
                        {entries.length > 0 ? (
                            entries.map(entry => (
                                <div className="entry" key={entry.id} >
                                    <div className="entry-cover">
                                        <img
                                            src={`https://song-dao-backend.onrender.com/files/image/${entry.imageId}`}
                                            alt={entry.title}
                                        />
                                    </div>
                                    <div className="entry-info">
                                        {entry.title}
                                        <div className="btn-container">
                                            <button onClick={() => { setSelectedEntry(entry); setEditModalOpen(true) }} className="sua-btn">sửa <FaPen size={15} className="sua-icon" /></button>
                                            <button onClick={() => handleDelete(entry.id)} className="xoa-btn">xóa <FaTrash size={15} className="xoa-icon" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Chưa có thư giáo xứ nào.</p>
                        )}
                    </div>

                    <SuaThuGiaoXu isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} entryData={selectedEntry} onEditSuccess={fetchEntries} />

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

export default QuanLyThuGiaoXu;