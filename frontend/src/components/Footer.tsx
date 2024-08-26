import React from 'react';
import '../styles/global.css';
import '../styles/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {  // 수정
    return (
        <footer className='font-extrabold'>
            <Link to="/" className='width-child'>
                <img
                    className='footer-img'
                    src={require('../assets/logo-night.png')}
                />
            </Link>
            <div className='footer-item'>
                <a
                    className='footer-link'
                    href='https://github.com/YoungJunRoh/dream-high'
                    target="_blank"
                >About</a>
            </div>
            <div className='footer-item'>
                <a onClick={() => window.alert("공사중")}>Privacy Policy</a>
            </div>
            <div className='footer-item'>
                <a
                    className='footer-link'
                    href='https://discord.com/channels/1271016042243817604/1274978267212021760'
                    target='_blank'
                >Contact Us</a>
            </div>
            <div className='footer-item'>
                <a
                    className='footer-link'
                    href='https://energetic-voyage-1d2.notion.site/Dream-High-e4814e208c7f4a03a1ad2ffbc857751e?pvs=4'
                    target='_blank'
                >Our Team</a>
            </div>
            <div className='footer-ourteam font-normal'>Develop by
                <span className='footer-color-gold font-extrabold'>Team DreamHigh</span>
            </div>

        </footer>
    );
}

export default Footer; // 수정