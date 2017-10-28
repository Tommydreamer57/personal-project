import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { connect } from 'react-redux';
import { adminSelectPost, getComments } from '../../../ducks/reducer';
import axios from 'axios';
import { Redirect } from 'react-router';
import './CreatePost.css';
import { Editor } from 'slate-react';
// import { State } from 'slate';       // ONLY FOR USING JSON
import html, { schema } from '../SlateEditor/html-rules';

const existingState = '<h1>Hello !!!</h1>'

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            redirectid: 0,
            section: ``,
            subsection: ``,
            title: ``,
            subtitle: ``,
            body: ``,
            imgurl: ``
        }
    }
    create = () => {
        axios.post(`/admin/createpost/${this.props.user.id}`, this.state)
            .then(response => {
                console.log(response.data)
                this.setState({
                    redirectid: response.data[0].id,
                    redirect: true
                })
            })
    }
    handleChange = (target, value) => {
        this.setState({
            [target]: value
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={`/admin/editpost/${this.state.redirectid}`} />
        }
        let post = this.state || ``
        return (
            <div className='CreatePost'>
                <div className='title-box'>
                    <div>
                        Create New Post
                    </div>
                </div>
                <div className='subtitle-box'>
                    <div>
                        Section:&nbsp;
                    </div>
                    <input
                        className='input'
                        placeholder='click here'
                        value={post.section}
                        onChange={e => this.handleChange('section', e.target.value)}
                    />
                    <select>
                        {
                            this.props.sections
                        }
                    </select>
                </div>
                <div className='subtitle-box'>
                    <div>
                        Subsection:&nbsp;
                    </div>
                    <input
                        className='input'
                        placeholder='click here'
                        value={post.subsection}
                        onChange={e => this.handleChange('subsection', e.target.value)}
                    />
                </div>
                <div className='subtitle-box'>
                    Title:&nbsp;
                    <input
                        className='input'
                        placeholder='click here'
                        value={post.title}
                        onChange={e => this.handleChange('title', e.target.value)}
                    />
                </div>
                <div className='subtitle-box'>
                    Subtitle:&nbsp;
                    <input
                        className='input'
                        placeholder='click here'
                        value={post.subtitle}
                        onChange={e => this.handleChange('subtitle', e.target.value)}
                    />
                </div>
                <div className='create-box' onClick={this.create} >
                    CREATE
                </div>
                <Navbar />
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        selectedPost: state.selectedPost
    }
}

const outActions = {
    adminSelectPost,
    getComments
}

export default connect(mapStateToProps, outActions)(CreatePost);
