import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../reusable/Navbar/Navbar';
import axios from 'axios';
import { UserTile } from '../../reusable/PostTile/PostTile';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get(`/admin/users`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    users: response.data
                })
            })
    }
    render() {
        return (
            <div className='Users'>
                <div className='title-box'>
                    Users
                </div>
                <div className='subtitle-box'>
                    Click a user to view info
                </div>
                <div className='post-box'>
                    {
                        this.state.users.length ?
                            this.state.users.map((user, i) => {
                                return (
                                    <UserTile
                                        key={i}
                                        user={user}
                                    />
                                )
                            })
                            :
                            null
                    }
                </div>
                <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

const outActions = {

}

export default connect(mapStateToProps, outActions)(Users);
