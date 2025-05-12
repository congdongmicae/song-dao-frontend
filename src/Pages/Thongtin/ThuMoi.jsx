import React from 'react'
import './ThuMoi.css'
import { useState, useEffect } from 'react';
import { FaPlus, FaDownload, FaEye } from 'react-icons/fa';

const ThuMoi = () => {
    const [entries, setEntries] = useState([]);
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

    const handleDownload = (pdfId, title) => {
        const link = document.createElement('a');
        link.href = `https://song-dao-backend.onrender.com/files/pdf/download/${pdfId}`;
        link.setAttribute('download', `${title}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="quan-ly-thu-moi-container">
            <div className="thu-moi-content-container">
                <div className="thu-moi-selection-container">
                    <center>
                        <div className="thu-moi-button-container">
                            <button className="thu-moi-create-new-entry-btn">
                                <FaPlus size={15} className="add-icon" /> go back
                            </button>
                        </div>
                        <div className="thu-moi-show-entry-container">
                            {entries.length > 0 ? (
                                entries.map(entry => (
                                    <div className="thu-moi-entry" key={entry.id} >
                                        <div className="thu-moi-entry-cover">
                                            <img
                                                src={`https://song-dao-backend.onrender.com/files/image/${entry.imageId}`}
                                            />
                                        </div>
                                        <div className="thu-moi-entry-info">
                                            {entry.title}
                                            <div className="thu-moi-btn-container">
                                                <button
                                                    className="thu-moi-download-btn"
                                                    onClick={() => handleDownload(entry.pdfId, entry.title)}
                                                >
                                                    Download <FaDownload size={15} className="download-icon" />
                                                </button>
                                                <a
                                                    href={`https://song-dao-backend.onrender.com/files/pdf/${entry.pdfId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="thu-moi-xem-btn">Xem Thư <FaEye size={15} className="xem-icon" /></button>
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

export default ThuMoi
