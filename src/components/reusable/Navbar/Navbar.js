import React, { Component } from 'react';
import { NavigationToggle, NavigationButton, LoginButton, LogoutButton } from '../Buttons/Button';
import './Navbar.css';

export default function Navbar(props) {
    return (
        <div className='Navbar'>
            <NavigationToggle />
            <div className='navigation-bar-wrapper' >
                <div className='navigation-bar' >
                    <LoginButton>Login</LoginButton>
                    <LogoutButton>Logout</LogoutButton>
                    <NavigationButton url='/home/' className='navigation-button'>Home</NavigationButton>
                    <NavigationButton url='/admin/' className='navigation-button'>Admin</NavigationButton>
                    <NavigationButton url='/section/' className='navigation-button'>Section</NavigationButton>
                    <NavigationButton url='/post/' className='navigation-button'>Post</NavigationButton>
                </div>
            </div>
            <div className='navigation-shadow' />
        </div>
    )
}