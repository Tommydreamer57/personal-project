import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className='Login'>
                <div className="welcome-box">
                    Welcome
                </div>
                <div className='subtitle-box'>
                    <a href={process.env.REACT_APP_LOGIN}>LOGIN</a>
                </div>
                <div className='subtitle-box'>
                    <a href='/home'>Continue without logging in</a>
                </div>
                <div className='login-container'>
                </div>
            </div>
        )
    }
}