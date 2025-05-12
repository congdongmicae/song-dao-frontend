import React from 'react'
import { Link } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs";
import './Thongtin.css'

const Thongtin = () => {
  return (
    <div>
      <div className="thong-tin-selection-container">
        <div className="btns-thongtin">
          <center>
            <Link>
              <button className="btn-thu-giao-xu">
                LỊCH <span className="notice-lich">(Chưa hoàn thành)</span><BsArrowRight className="arrow-go-to-thong-tin" />
              </button>
            </Link>

            <div className="space-between-thongtin-btn"></div>

            <Link to="/thugiaoxu">
              <button className="btn-thu-giao-xu">
                THƯ GIÁO XỨ <BsArrowRight className="arrow-go-to-thong-tin" />
              </button>
            </Link>

            <div className="space-between-thongtin-btn"></div>

            <Link to="/thumoi">
              <button className="btn-thu-giao-xu">
                THƯ MỜI <BsArrowRight className="arrow-go-to-thong-tin" />
              </button>
            </Link>

            <div className="space-between-thongtin-btn"></div>

            <Link to="/cao-pho">
              <button className="btn-thu-giao-xu">
                CÁO PHÓ <BsArrowRight className="arrow-go-to-thong-tin" />
              </button>
            </Link>
          </center>
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
    </div>
  )
}

export default Thongtin
