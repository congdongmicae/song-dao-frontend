import React, { useState, useEffect } from 'react';
import './AdminLogin.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

function showPassword() {
    var inputPassword = document.getElementById("password-input");
    if (inputPassword.type === "password") {
        inputPassword.type = "text";
    } else {
        inputPassword.type = "password";
    }
}

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams({
            email: email,
            password: password
        });

        try {
            const response = await fetch(`https://song-dao-backend.onrender.com/admin/login?${queryParams}`, {
                method: 'POST',
            });

            if (response.ok) {
                const successMessage = await response.text();
                sessionStorage.setItem('adminLoggedIn', 'true')
                alert(successMessage);
                navigate('/admin');
            } else {
                const errorMessage = await response.text();
                alert(`Login failed: ${errorMessage}`);
            }
        } catch (error) {
            alert("Error during login request: " + error);
            console.error('Error during login request:', error);
        }
    };

    return (
        <div>
            <div className="back">
                <Link to="/">
                    <div className="go-back">
                        <FiArrowLeft className="arrow-go-back" /> Quay lại
                    </div>
                </Link>
            </div>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <h1>Admin Login</h1>
                    <div className="login-input">
                        <input
                            type="email"
                            placeholder="E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-input">
                        <input
                            id="password-input"
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div class="show-password">
                        <label>hiện mật khẩu</label>
                        <input className="show-password-checkbox" type="checkbox" onClick={showPassword} />
                    </div>
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;