import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { connect } from 'react-redux';
import { adminSelectPost, getSections } from '../../../ducks/reducer';
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
            sections: [],
            newSection: ``,
            section: ``,
            subsection: ``,
            title: ``,
            subtitle: ``,
            body: `<p>Type your post body here...</p>`,
            imgurl: ``
        }
    }
    createSection = section => {

    }
    create = () => {
        console.log(this.state)
        if (!this.state.section) return
        if (!this.state.subsection) return
        if (!this.state.title) return
        if (!this.state.subtitle) return
        
        let body = Object.assign({}, this.state)
        if (body.section == 'create-new') {
            body.section = body.newSection
        }

        axios.post(`/api/admin/create/${this.props.user.id}`, body)
            .then(response => {
                console.log(response.data)
                this.setState({
                    redirectid: response.data[0].id,
                    redirect: true
                })
            })
    }
    handleChange = (target, value) => {
        // console.log(target)
        // console.log(value)
        this.setState({
            [target]: value
        })
    }
    componentDidMount() {
        axios.get(`/api/admin/sections`)
            .then(response => {
                this.setState({
                sections: response.data
            })
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
                    {/* <input
                        className='input'
                        placeholder='click here'
                        list='sections'                        
                        value={post.section}
                        onChange={e => this.handleChange('section', e.target.value)}
                    /> */}
                    <select className={this.state.section ? 'input' : 'input untouched'} id='sections' onChange={e => this.handleChange('section', e.target.value)} >
                        <option value='' disabled selected >click here</option>
                        {
                            this.state.sections.length ?
                                this.state.sections.map((item, i) => {
                                    // console.log(item)
                                    return (
                                        <option
                                            key={i}
                                            value={item.section}
                                        >
                                            {item.section}
                                        </option>
                                    )
                                })
                                :
                                null
                        }
                        <option value='create-new'>create new...</option>
                    </select>
                </div>
                {
                    this.state.section == 'create-new' ?
                        <div className='preview'>
                            <div className='subtitle-box'>
                                <div>
                                    New Section:&nbsp;
                            </div>
                                <input
                                    className='input'
                                    placeholder='type here'
                                    value={this.state.newSection}
                                    onChange={e => this.handleChange('newSection', e.target.value)}
                                />
                            </div>
                        </div>
                        :
                        null
                }
                <div className='subtitle-box'>
                    <div>
                        Subsection:&nbsp;
                    </div>
                    <input
                        className='input'
                        placeholder='type here'
                        value={post.subsection}
                        onChange={e => this.handleChange('subsection', e.target.value)}
                    />
                </div>
                <div className='subtitle-box'>
                    Title:&nbsp;
                    <input
                        className='input'
                        placeholder='type here'
                        value={post.title}
                        onChange={e => this.handleChange('title', e.target.value)}
                    />
                </div>
                <div className='subtitle-box'>
                    Subtitle:&nbsp;
                    <input
                        className='input'
                        placeholder='type here'
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
    adminSelectPost
}

export default connect(mapStateToProps, outActions)(CreatePost);
