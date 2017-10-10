import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';

export default class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className='AdminHome'>
                
                <Navbar />
            </div>
        )
    }
}
