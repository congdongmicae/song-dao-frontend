import React from 'react'
import './ThuGiaoXu.css'
import { Link, useNavigate } from 'react-router-dom';  // React Router for navigation
import { useState, useEffect } from 'react';
import { FaPlus, FaDownload, FaEye } from 'react-icons/fa';

const ThuGiaoXu = () => {
    const [entries, setEntries] = useState([]);
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

    const handleDownload = (pdfId, title) => {
        const link = document.createElement('a');
        link.href = `https://song-dao-backend.onrender.com/files/pdf/download/${pdfId}`;
        link.setAttribute('download', `${title}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="quan-ly-container">
            <div className="content-container">
                <div className="selection-container">
                    <center>
                        <div className="button-container">
                            <button className="create-new-entry-btn">
                                <FaPlus size={15} className="add-icon" /> go back
                            </button>
                        </div>
                        <div className="show-entry-container">
                            {entries.length > 0 ? (
                                entries.map(entry => (
                                    <div className="entry" key={entry.id} >
                                        <div className="entry-cover">
                                            <img
                                                src={`https://song-dao-backend.onrender.com/files/image/${entry.imageId}`}
                                            />
                                        </div>
                                        <div className="entry-info">
                                            {entry.title}
                                            <div className="btn-container">
                                                <button
                                                    className="download-btn"
                                                    onClick={() => handleDownload(entry.pdfId, entry.title)}
                                                >
                                                    Download <FaDownload size={15} className="download-icon" />
                                                </button>
                                                <a
                                                    href={`https://song-dao-backend.onrender.com/files/pdf/${entry.pdfId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="xem-btn">Xem Thư <FaEye size={15} className="xem-icon" /></button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Chưa có thư giáo xứ nào.</p>
                            )}
                        </div>
                    </center>
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
    )
}

export default ThuGiaoXu



