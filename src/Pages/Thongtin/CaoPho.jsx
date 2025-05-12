import React from 'react'
import './CaoPho.css'
import { Link, useNavigate } from 'react-router-dom';  // React Router for navigation
import { useState, useEffect } from 'react';
import { FaPlus, FaDownload, FaEye, FaCross, FaAsterisk } from 'react-icons/fa';

const CaoPho = () => {
    const [entries, setEntries] = useState([]);
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

    const handleDownload = (pdfId, title) => {
        const link = document.createElement('a');
        link.href = `https://song-dao-backend.onrender.com/files/pdf/download/${pdfId}`;
        link.setAttribute('download', `${title}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="cao-pho-quan-ly-container">
            <div className="cao-pho-content-container">
                <div className="cao-pho-selection-container">
                    <center>
                        <div className="cao-pho-button-container">
                            <button className="cao-pho-create-new-entry-btn">
                                <FaPlus size={15} className="add-icon" /> go back
                            </button>
                        </div>
                        <div className="cao-pho-show-entry-container">
                            {entries.length > 0 ? (
                                entries.map(entry => (
                                    <div className="cao-pho-entry" key={entry.id} >
                                        <div className="cao-pho-entry-cover">
                                            <img
                                                src={`https://song-dao-backend.onrender.com/files/image/${entry.imageId}`}
                                            />
                                        </div>
                                        <div className="cao-pho-entry-info">
                                            {entry.title}
                                            <div className="birth"> <FaAsterisk size={12} /> {entry.birth} </div>
                                            <div className="death"> <FaCross size={12} /> {entry.death} </div>
                                            <div className="cao-pho-btn-container">
                                                <button
                                                    className="cao-pho-download-btn"
                                                    onClick={() => handleDownload(entry.pdfId, entry.title)}
                                                >
                                                    Download <FaDownload size={15} className="download-icon" />
                                                </button>
                                                <a
                                                    href={`https://song-dao-backend.onrender.com/files/pdf/${entry.pdfId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="cao-pho-xem-btn">Xem <FaEye size={15} className="xem-icon" /></button>
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
            <div className="footer-cao-pho">
                <div className="copyright-cao-pho">
                    © Cộng Đồng Thánh Micae - Tổng Giáo Phận Paderborn & Essen
                </div>
                <div className="year-cao-pho">
                    2025
                </div>
            </div>
        </div>
    )
}

export default CaoPho