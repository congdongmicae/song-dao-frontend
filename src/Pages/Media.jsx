import React from 'react'
import { Link } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs";
import './Media.css'

const Media = () => {
    return (
        <div>
            <center>
                <div className="media-selection-container">
                    <div className="btns-media">
                        <Link>
                            <button className="btn-media">
                                HÌNH ẢNH  <span className="notice-lich">(Chưa hoàn thành)</span><BsArrowRight className="arrow-go-to-thong-tin" />
                            </button>
                        </Link>

                        <div className="space-between-media"></div>

                        <Link>
                            <button className="btn-media">
                                VIDEO <span className="notice-lich">(Chưa hoàn thành)</span><BsArrowRight className="arrow-go-to-thong-tin" />
                            </button>
                        </Link>
                    </div>
                </div>
            </center>

            <div className="footer-media">
                <div className="copyright-media">
                    © Cộng Đồng Thánh Micae - Tổng Giáo Phận Paderborn & Essen
                </div>
                <div className="year-media">
                    2024
                </div>
            </div>
        </div>
    )
}

export default Media
