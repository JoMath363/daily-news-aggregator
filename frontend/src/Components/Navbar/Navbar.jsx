import './Navbar.css';

import menu_icon from '../Assets/menu-icon.png'
import logo_icon from '../Assets/logo-icon.png'
import search_icon from '../Assets/search-icon.png'

import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Navbar = ({ setCategory }) => {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');

        setUser(null);

        window.location.href = '/';
    };

    const toggleSidebar = () => {
        let sidebar = document.getElementById('side_bar');
        sidebar.classList.toggle('active')
    }

    const changeCategory = (category) => {
        if (location.pathname !== '/') {
            navigate('/')
        }

        setCategory(category)
    }

    return (
        <header id="header">
            <h2 id="header_left">
                <button id="side_bar_btn" onClick={toggleSidebar}>
                    <img src={menu_icon} draggable="false" />
                </button>

                <a href="/" id="logo">
                    <img src={logo_icon} draggable="false" />
                    Daily News
                </a>
            </h2>

            <div id="header_right">
                {user === null ? (
                    <a href='/login' className="auth-item">Login</a>
                ) : (
                    <button className='auth-item' onClick={handleLogout}>Log Out</button>
                )}
            </div>

            <aside id="side_bar">
                <div id="search_box">
                    <input id="search_input" type="search" placeholder="Search" />
                    <img src={search_icon} />
                </div>

                <nav id="side_nav">
                    <a href='/favorites'>Favorites</a>
                    <button onClick={() => changeCategory('general')}>General</button>
                    <button onClick={() => changeCategory('business')}>Business</button>
                    <button onClick={() => changeCategory('entertainment')}>Entertainment</button>
                    <button onClick={() => changeCategory('health')}>Health</button>
                    <button onClick={() => changeCategory('science')}>Science</button>
                    <button onClick={() => changeCategory('sports')}>Sports</button>
                    <button onClick={() => changeCategory('technology')}>Technology</button>
                </nav>
            </aside>
        </header>
    )
};

export default Navbar;
