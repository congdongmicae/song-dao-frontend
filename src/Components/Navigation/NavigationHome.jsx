import React from 'react'
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom";
import './NavigationHome.css'

const NavigationHome = () => {
    return (
        <div>
            <nav>
                <Link to="/" className="logo-home">
                    SỐNG ĐẠO <br></br> <span className="sub-header"> Cộng Đồng Thánh Micae </span>
                </Link>
                <ul>
                    <li>
                        <NavLink to="/chabien">
                            <button className="btn-cha-bien">
                                CHA BIÊN
                            </button>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/congdong">
                            <button className="btn-congdong">
                                CỘNG ĐỒNG
                            </button>
                        </NavLink>
                    </li>

                    <li className="contact-fb">
                        <Link to="https://www.facebook.com/profile.php?id=100089948277918&locale=de_DE" target="_blank">
                            <button className="btn-fb">
                                FACEBOOK
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationHome
