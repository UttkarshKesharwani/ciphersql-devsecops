import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Navbar() {
    const navigate = useNavigate()
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span className="logo-text">Cipher<span className="highlight">SQL</span></span>
                <span className="logo-badge">Playground</span>
            </div>

          

            <div className="navbar-profile">
                
                {!user && <button className="nav-btn signup-btn" onClick={() => navigate('/signup')}>SignUp</button>}
                {user ? 
                    <p className='profile-name'>{user.name[0].toUpperCase()}</p>
                : <button className="nav-btn login-btn" onClick={() => navigate('/login')}>Login <CiLogin /></button>
                }
                {user && <button className='nav-btn logout-btn' onClick={handleLogout}><CiLogout />Logout</button>}
            </div>
        </nav>
    );
}

export default Navbar;
