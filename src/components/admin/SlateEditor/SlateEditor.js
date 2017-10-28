import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { connect } from 'react-redux';
import { clearSelectedPost, adminSelectPost, getComments } from '../../../ducks/reducer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SlateEditor.css';

import { Editor } from 'slate-react';
// import { State } from 'slate';       // ONLY FOR USING JSON
import html, { schema } from './html-rules';

const existingState = '<h1>Hello !!!</h1>'

class SlateEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // EDITABLE DATA
            // doNotReset: true,
            // sectionEdit: false,
            // subsectionEdit: false,
            // titleEdit: false,
            // subtitleEdit: false,
            // NORMAL STATE
            id: 0,
            section: ``,
            subsection: ``,
            title: ``,
            subtitle: ``,
            body: ``,
            imgurl: ``,
            // SLATE STATE
            state: html.deserialize(existingState),
            schema: schema
        }
        this.ctrl = false
    }
    save = () => {
        let string = html.serialize(this.state.state)
        axios.put(`/admin/slate/body/${this.state.id}`, { string })
            .then(response => {
                console.log(response.data)
                this.props.adminSelectPost(this.state.id)
            })
    }
    onChange = ({ state }) => {
        if (state.document != this.state.document) {
            let string = html.serialize(state)
            // console.log(string)
            localStorage.setItem('content', string)
        }
        this.setState({ state })
    }
    onKeyDown = (event, change) => {
        // console.log(change.state)
        // SETS CONTROL TO TRUE WHEN PRESSED
        if (event.key == 'Control') {
            this.ctrl = true
        }
        // RETURN IF CONTROL IS NOT PRESSED
        if (!this.ctrl) return
        else switch (event.key) {
            // CHANGE BLOCK BETWEEN CODE AND PARAGRAPH ON '`'
            case '`':
                let isCode = change.state.blocks.some(block => block.type == 'code')
                event.preventDefault();
                change.setBlock(isCode ? 'paragraph' : 'code')
                return true;
            case 'b':
                event.preventDefault();
                change.toggleMark('bold');
                return true;
            case 'i':
                event.preventDefault();
                change.toggleMark('italic')
                return true;
            case 's':
                event.preventDefault();
                this.save();
            default:
                return;
        }
    }
    onKeyUp = (event, change) => {
        // SETS CONTROL BACK TO FALSE WHEN RELEASED
        if (event.key == 'Control') {
            this.ctrl = false
        }
    }
    // toggleEdit = (target) => {
    //     console.log(target)
    //     console.log(this.state[target])
    //     this.setState({
    //         [target]: !this.state[target]
    //     })
    // }
    handleChange = (target, value) => {
        // console.log(value)
        this.setState({
            [target]: value
        })
    }
    resetEdit = () => {
        console.log('it worked')
        if (this.state.doNotReset) return
        this.setState({
            sectionEdit: false,
            subsectionEdit: false,
            titleEdit: false,
            subtitleEdit: false
        })
    }
    componentDidMount() {
        let { postid } = this.props.match.params;
        let post = this.props.selectedPost || ``;
        if (!post.id) {
            console.log('edit post selecting post')
            this.props.adminSelectPost(postid)
                .then(() => {
                    post = this.props.selectedPost
                    this.setState({
                        id: postid,
                        section: post.section,
                        subsection: post.subsection,
                        title: post.title,
                        subtitle: post.subtitle,
                        body: post.body,
                        imgurl: post.imgurl,
                        state: html.deserialize(post.body)
                    })
                })
        }
        else {
            this.setState({
                id: postid,
                section: post.section,
                subsection: post.subsection,
                title: post.title,
                subtitle: post.subtitle,
                body: post.body,
                imgurl: post.imgurl,
                state: html.deserialize(post.body)
            })
        }
        console.log('edit post getting comments')
        this.props.getComments(postid)
    }
    componentWillUnmount() {
        this.props.clearSelectedPost()
    }
    render() {
        // let post = this.state || ``
        console.log(this.props.selectedPost.published)
        return (
            <div className={this.props.selectedPost.published ? 'SlateEditor' : 'SlateEditor preview'} >
                <div className='title-box'>
                    Edit Post
                </div>
                <div className='subtitle-box'>
                    <div>Section:&nbsp;</div>
                    <input    
                        value={this.state.section}
                        onChange={e => this.handleChange('section', e.target.value)}
                        /* onKeyDown={key => console.log(key)} */
                    />
                </div>
                <div className='subtitle-box'>
                    <div>Subsection:&nbsp;</div>
                    <input
                        value={this.state.subsection}
                        onChange={e => this.handleChange('subsection', e.target.value)}
                    />
                </div>
                <div className='subtitle-box'>
                    <div>Title:&nbsp;</div>
                    <input
                        value={this.state.title}
                        onChange={e => this.handleChange('title', e.target.value)}
                    />
                </div>
                <div className='subtitle-box'>
                    <div>Subtitle:&nbsp;</div>
                    <input
                        value={this.state.subtitle}
                        onChange={e => this.handleChange('subtitle', e.target.value)}
                    />
                </div>
                <div className='text-box'>
                    Body:
                    <div className='editor language-javascript'>
                        <Editor
                            schema={this.state.schema}
                            state={this.state.state}
                            onChange={this.onChange}
                            onKeyDown={this.onKeyDown}
                            onKeyUp={this.onKeyUp}
                        />
                    </div>
                    <div className='save-button' onClick={this.save}>Save</div>
                </div>
                <Link className='subtitle-box' to={`/posts/${this.props.selectedPost.id}`} >
                    View Post
                </Link>
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
    getComments,
    clearSelectedPost
}

export default connect(mapStateToProps, outActions)(SlateEditor);
