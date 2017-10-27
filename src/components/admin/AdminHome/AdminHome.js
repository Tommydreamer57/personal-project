import React, { Component } from 'react';
import { connect } from 'react-redux';
import SectionTile from '../../pages/Home/SectionTile/SectionTile';
import PostTile from '../../reusable/PostTile/PostTile';
import Navbar from '../../reusable/Navbar/Navbar';
import { LoginButton } from '../../reusable/Buttons/Button';
import { adminSelectPost, selectSection } from '../../../ducks/reducer';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: []
        }
    }
    componentDidMount() {
        let { admin } = this.props.user || ``
        if (admin) {
            axios.get(`/admin/sections`)
                .then(response => {
                    this.setState({
                        sections: response.data
                    })
                })
            // axios.get(`/admin/posts`)
            //     .then(response => {
            //         this.setState({
            //             posts: response.data
            //         })
            //     })
        }
    }
    render() {
        let { first_name, last_name, username, admin } = this.props.user || ``
        let name = first_name ? first_name + ' ' + last_name : username;
        // admin = true;
        if (!admin) {
        }
        return (
            admin ?
                (
                    <div className='AdminHome'>
                        <div className='title-box'>
                            {`Welcome, ${name}`}
                        </div>
                        <div className='post-box'>
                            <PostTile url='/admin/createpost' title='Create New Post' />
                        </div>
                        <div className='post-box'>
                            {
                                this.state.sections.map((item, i) => {
                                    console.log(item)
                                    return (
                                        <SectionTile
                                            url={`/sections/${item.id || ``}`}
                                            title={item.section || `Section #${i}`}
                                            key={i}
                                            function={this.props.selectSection}
                                            parent='admin'
                                        />
                                    )
                                })
                            }
                        </div>
                        <Navbar />
                    </div>
                )
                :
                (
                    <div className='AdminHome'>
                        <div className='text-box'>
                            <div className='subtitle'>Please log in as admin</div>
                            <LoginButton>Login</LoginButton>
                            <Redirect to='/' />
                        </div>
                        <Navbar />
                    </div>
                )
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        sections: state.sections
    }
}

const outActions = {
    adminSelectPost,
    selectSection
}

export default connect(mapStateToProps, outActions)(AdminHome);
