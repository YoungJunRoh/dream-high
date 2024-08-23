import React from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';
import { MenuTap } from '../components/MenuTap.tsx';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';

const Header = () => {
    const { headerMode } = useHeaderMode();

    const HeaderView = () => {
        if (headerMode === 'main') {
            return <header>
                <div className='width-wrapper'></div>
                <Link to='/'><img id='logo' src={require('../assets/logo.png')} className='draggable-img' /></Link>
                <MenuTap></MenuTap>
            </header>
        } else if ('board') {
            return <header>
                <Link to='/board'><img id='logo' src={require('../assets/logo-board.png')} className='draggable-img' /></Link>
                <div className='width-wrapper'></div>
                <div className='width-wrapper'></div>
                <div className='width-wrapper'></div>
                <Link to='/'><div id='header-home' /></Link>
                <MenuTap></MenuTap>
            </header>
        }
    }
    return (
        <HeaderView/>
    );
}

export default Header;