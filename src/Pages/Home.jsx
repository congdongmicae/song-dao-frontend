import React from 'react'
import './Home.css'
import { Link } from "react-router-dom"
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useEffect } from 'react';

const Home = () => {
    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div className="home-page">
            <center>
                <div className="home-container">
                    <Link to="/thongtin">
                        <div className="thongtin-container">
                            <img src="src/assets/images/thongtin-thumb.jpg"></img>
                            <p className="thongtin-text">
                                THÔNG TIN
                            </p>
                        </div>
                    </Link>

                    <div className="spacebetween">
                    </div>

                    <Link to="/sinhhoat">
                        <div className="sinhhoat-container">
                            <img src="src/assets/images/sinhhoat-thumb.jpg"></img>
                            <p className="sinhhoat-text">
                                SINH HOẠT
                            </p>
                        </div>
                    </Link>

                    <div className="spacebetween">
                    </div>

                    <Link>
                        <div className="media-container">
                            <img src="src/assets/images/media-thumb.jpg"></img>
                            <p className="media-text">
                                <span className="media-text-headline">Chưa hoàn thành</span> <br></br>MEDIA
                            </p>
                        </div>
                    </Link>

                    <div className="spacebetween">
                    </div>

                    <div className="congdong-container">
                        <img src="src/assets/images/congdong-thumb.jpg"></img>
                        <p className="congdong-text">
                            <span className="congdong-text-headline">Chưa hoàn thành</span> <br></br> VỀ <br></br> CỘNG <br></br>ĐỒNG
                        </p>
                    </div>
                </div>

                <div className="go-down-home-container">
                    <Link>
                        <button className="go-down-home-btn" onClick={scrollToBottom}>
                            <IoIosArrowRoundDown className="down-icon" />
                        </button>
                    </Link>
                </div>

                <div className="thanh-micae-container">
                    <button className="go-up-home-btn" onClick={scrollToTop}>
                        <IoIosArrowRoundUp className="up-icon" />
                    </button>

                    <div className="img-text-container-home">
                        <img className="thanh-micae" src="src/assets/images/thanh-micae.png"></img>
                        <div className="thanh-micae-text">
                            VỀ<br></br>THÁNH<br></br>MICAE<br></br>
                            <Link to="#">
                                <button className="go-to-ve-thanh-btn">
                                    <IoIosArrowRoundForward className="right-icon" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </center>
            <div className="footer-home">
                <div className="copyright">
                    <span className="copyright-year">© 2025</span> Cộng Đồng Thánh Micae - Tổng Giáo Phận Paderborn & Essen
                </div>
                <div className="admin">
                    <Link to="/admin-login">
                        admin
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
