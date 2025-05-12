import React from 'react';
import './QuanLyCaoPho.css';
import { useEffect } from 'react';
import { FaPlus, FaPen, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CaoPhoModal from './CaoPhoModal';
import SuaCaoPho from './SuaCaoPho';

function QuanLyCaoPho() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const fetchEntries = () => {
        fetch('https://song-dao-backend.onrender.com/caopho/entry')
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
            fetch(`https://song-dao-backend.onrender.com/caopho/entry/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        alert('cáo phó đã bị xóa.');
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
        <div className="quan-ly-cao-pho-container">
            <div className="quan-ly-cao-pho-content-container">
                <div className="cao-pho-select-container">
                    <div className="cao-pho-go-back-container">
                        <button className="go-back-btn" onClick={() => navigate('/admin')}>
                            <FaArrowLeft size={15} className="add-icon" /> quay lại
                        </button>
                    </div>

                    <div className="edit-cao-pho-banner">
                        cáo phó
                        <span className="edit-cao-pho-sub-header">đưa lên, chỉnh sửa và xóa</span>

                        <div className="create-cao-pho-button-container">
                            <button className="create-new-entry-cao-pho-btn" onClick={() => setModalOpen(true)}>
                                <FaPlus size={15} className="add-icon" /> đưa lên cáo phó
                            </button>
                            <CaoPhoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmitSuccess={fetchEntries} />
                        </div>
                    </div>

                    <div className="entry-cao-pho-container">
                        {entries.length > 0 ? (
                            entries.map(entry => (
                                <div className="entry-cao-pho" key={entry.id} >
                                    <div className="entry-cao-pho-cover">
                                        <img
                                            src={`https://song-dao-backend.onrender.com/files/image/${entry.imageId}`}
                                        />
                                    </div>
                                    <div className="entry-cao-pho-info">
                                        {entry.title}
                                        <div className="btn-cao-pho-container">
                                            <button onClick={() => { setSelectedEntry(entry); setEditModalOpen(true) }} className="sua-cao-pho-btn">sửa <FaPen size={15} className="sua-cao-pho-icon" /></button>
                                            <button onClick={() => handleDelete(entry.id)} className="xoa-cao-pho-btn">xóa <FaTrash size={15} className="xoa-cao-pho-icon" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Chưa có cáo phó nào.</p>
                        )}
                    </div>
                    <SuaCaoPho isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} entryData={selectedEntry} onEditSuccess={fetchEntries} />
                </div>
            </div>
            <div className="footer-cao-pho">
                <div className="copyright-cao-pho">
                    © Cộng Đồng Thánh Micae - Tổng Giáo Phận Paderborn & Essen
                </div>
                <div className="year-cao-pho">
                    2025
                </div>
            </div>
        </div>
    );
}

export default QuanLyCaoPho