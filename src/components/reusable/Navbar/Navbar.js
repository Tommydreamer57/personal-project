import React, { Component } from 'react';
import { NavigationButton } from '../Buttons/Button';
import './Navbar.css';

export default function Navbar(props) {
    return (
        <div className='Navbar'>
            <div className='navigation-bar'>
                <NavigationButton url='/' className='navigation-button'>Login</NavigationButton>
                <NavigationButton url='/home/' className='navigation-button'>Home</NavigationButton>
                <NavigationButton url='/admin/' className='navigation-button'>Admin</NavigationButton>
                <NavigationButton url='/section/' className='navigation-button'>Section</NavigationButton>
                <NavigationButton url='/post/' className='navigation-button'>Post</NavigationButton>
            </div>
            
            <div className='navigation-shadow' />
        </div>
    )
}