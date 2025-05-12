import React from 'react'
import './Navigation.css'
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

const Navigation = () => {
    return (
        <div className="nav-container">
            <nav className="nav-links">
                <div className="nav-left">
                    <Link to="/" className="logo">
                        SỐNG ĐẠO <br /> <span className="sub-header"> Cộng Đồng Thánh Micae </span>
                    </Link>

                    <ul>
                        <li><NavLink to="/thongtin">THÔNG TIN</NavLink></li>
                        <li><NavLink to="/sinhhoat">SINH HOẠT</NavLink></li>
                        <li><NavLink to="/media">MEDIA</NavLink></li>
                        <li><NavLink to="/congdong">CỘNG ĐỒNG</NavLink></li>
                        <li><NavLink to="/">LIÊN HỆ</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>

    )
}

export default Navigation
