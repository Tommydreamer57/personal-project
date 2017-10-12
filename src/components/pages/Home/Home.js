import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { connect } from 'react-redux';
import { getUser } from '../../../ducks/reducer';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getUser();
    }
    render() {
        console.log(this.props)
        return (
            <div className='Home'>
                <div className='title-box' >
                    Welcome
                </div>
                <div className='subtitle-box'>
                    This is the subtitle
                </div>
                <Navbar />                
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        user: state.user
    }
}

const outActions = {
    getUser
}

export default connect(mapStateToProps, outActions)(Home);
