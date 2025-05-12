import React from 'react';
import './Admin.css';
import { Link, useNavigate } from 'react-router-dom';  // React Router for navigation
import { useEffect } from 'react';
import { FaArrowRight, FaCross, FaEnvelopeOpen, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';

function Admin() {
    const navigate = useNavigate();  // useNavigate to redirect after logout

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
        if (!isLoggedIn) {
            navigate('/admin-login');
        }
    }, []);

    const logout = () => {
        sessionStorage.removeItem('adminLoggedIn');
        navigate('/admin-login')
    };

    const redirectToManageThuGiaoXu = () => {
        navigate('/quan-ly-thu-giao-xu')
    }

    const redirectToManageThuMoi = () => {
        navigate('/quan-ly-thu-moi')
    }

    const redirectToManageCaoPho = () => {
        navigate('/quan-ly-cao-pho')
    }

    return (
        <div className="admin-container">
            <div className="content-container">
                <div className="selection-container">
                    <center>
                        <button className="upload-thu-giao-xu">
                            <div className="upload-icon">
                                <FaBookOpen size={70} color="white" />
                            </div>
                            <div className="upload-text" style={{ textAlign: 'left' }}>
                                QUẢN LÝ THƯ GIÁO XỨ <div className="space-btwn-text"></div> <span className="description-text">đưa lên, chỉnh sửa và xóa thư giáo xứ</span>
                                <div className="redirect">
                                    <button className="redirect-btn" onClick={redirectToManageThuGiaoXu}>
                                        <FaArrowRight size={20} color="white" />
                                    </button>
                                </div>
                            </div>
                        </button>

                        <button className="upload-thu-moi">
                            <div className="upload-icon">
                                <FaEnvelopeOpen size={70} color="white" />
                            </div>
                            <div className="upload-text" style={{ textAlign: 'left' }}>
                                QUẢN LÝ THƯ MỜI <div className="space-btwn-text"></div> <span className="description-text">đưa lên, chỉnh sửa và xóa thư mời</span>
                                <div className="redirect">
                                    <button className="redirect-btn" onClick={redirectToManageThuMoi}>
                                        <FaArrowRight size={20} color="white" />
                                    </button>
                                </div>
                            </div>
                        </button>

                        <button className="upload-cao-pho">
                            <div className="upload-icon">
                                <FaCross size={70} color="white" />
                            </div>
                            <div className="upload-text" style={{ textAlign: 'left' }}>
                                QUẢN LÝ CÁO PHÓ <div className="space-btwn-text"></div> <span className="description-text">đưa lên, chỉnh sửa và xóa cáo phó</span>
                                <div className="redirect">
                                    <button className="redirect-btn" onClick={redirectToManageCaoPho}>
                                        <FaArrowRight size={20} color="white" />
                                    </button>
                                </div>
                            </div>
                        </button>
                        <div></div>
                        <button className="logout-btn" onClick={logout}>
                            Đăng xuất <FaSignOutAlt size={15} className="logout-icon" />
                        </button>
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
    );
}

export default Admin;