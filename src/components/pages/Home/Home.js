import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
//import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className='Home'>
                <div className='title-box'>
                    Section Title
                </div>
                <div className='subtitle-box'>
                    This is the subtitle
                </div>
                <Navbar />                
            </div>
        )
    }
}
