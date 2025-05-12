import React from 'react';
import './ThuGiaoXuForm.css';
import { Link, useNavigate } from 'react-router-dom';  // React Router for navigation
import { useEffect } from 'react';

function ThuGiaoXuForm() {
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
        if (!isLoggedIn) {
            navigate('/admin-login');
        }
    }, []);

    return (
        <div>
            <div className="thu-giao-xu-container">
                <form>
                    <label>Title</label>
                    <div>
                        <input type="text"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ThuGiaoXuForm;