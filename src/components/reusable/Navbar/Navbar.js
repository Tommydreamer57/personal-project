import React, { Component } from 'react';
import { NavigationToggle, NavigationButton, LoginButton, LogoutButton } from '../Buttons/Button';
import './Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className='Navbar'>
                <div className='navigation-bar-wrapper' >
                    <div className='navigation-bar' >
                        <LoginButton>Login</LoginButton>
                        <LogoutButton>Logout</LogoutButton>
                        <NavigationButton url='/home/' className='navigation-button'>Home</NavigationButton>
                        <NavigationButton url='/admin/' className='navigation-button'>Admin</NavigationButton>
                        <NavigationButton url='/section/' className='navigation-button'>Section</NavigationButton>
                        <NavigationButton url='/post/' className='navigation-button'>Post</NavigationButton>
                        <NavigationButton url='/favorites' className='navigation-button'>Favorites</NavigationButton>
                    </div>
                    <NavigationToggle />                    
                </div>
                <div className='navigation-shadow' />
                <div className='responsive-shadow' />
            </div>
        )
    }    
}