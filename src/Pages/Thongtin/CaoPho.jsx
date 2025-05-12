import React from 'react'
import './CaoPho.css'
import { Link, useNavigate } from 'react-router-dom';  // React Router for navigation
import { useState, useEffect } from 'react';
import { FaPlus, FaDownload, FaEye, FaCross, FaAsterisk, FaArrowLeft } from 'react-icons/fa';

const CaoPho = () => {
    const navigate = useNavigate();
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
        <div className="cao-pho-container">
            <div className="cao-pho-header">
                <div className="cao-pho-go-back-button" onClick={() => navigate('/thongtin')}>
                    <div className="circle-background">
                    </div>
                    <div className="circle-foreground">
                        <span className="fa-arrow"><FaArrowLeft size={25} /></span>
                    </div>
                </div>

                <div className="quote">
                    "Đừng sợ, vì Ta đã chuộc ngươi về,<br></br>
                    đã gọi ngươi bằng chính tên<br></br>
                    ngươi: ngươi là của riêng Ta!"<br></br>
                    - Isaiah 43: 1b
                </div>

            </div>
            <div className="cao-pho-content-container">
                <div className="cao-pho-selection-container">
                    <center>
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