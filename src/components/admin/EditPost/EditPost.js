import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminSelectPost, getComments } from '../../../ducks/reducer';
import Navbar from '../../reusable/Navbar/Navbar';
import axios from 'axios';
import './EditPost.css';
// import Quill from 'quill';
// import SlateEditor from './SlateEditor/SlateEditor';

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            section: ``,
            subsection: ``,
            title: ``,
            subtitle: ``,
            body: ``,
            imgurl: ``
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.publish = this.publish.bind(this);
    }
    handleChange(target, value) {
        // console.log(target)
        // console.log(value)
        // console.log(this.state)
        this.setState({
            [target]: value
        })
    }
    save() {
        axios.put(`/admin/editpost/${this.state.id}`, this.state)
            .then(response => {
                console.log(response.data)
            })
    }
    publish() {
        if (this.props.selectedPost.published) {
            axios.put(`/admin/publish/${this.state.id}`)
                .then(response => {
                    console.log(response.data)
                    this.props.adminSelectPost(this.props.match.params.postid)
                })
        }
        else {
            axios.put(`/admin/unpublish/${this.state.id}`)
                .then(response => {
                    console.log(response.data)
                    this.props.adminSelectPost(this.props.match.params.postid)
                })
        }
    }
    componentDidMount() {
        let { postid } = this.props.match.params;
        let post = this.props.selectedPost || ``;
        if (!post) {
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
                        imgurl: post.imgurl
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
                imgurl: post.imgurl
            })
        }
        console.log('edit post getting comments')
        this.props.getComments(postid)
    }
    render() {

        // let options = {
        //     modules: {
        //         toolbar: true
        //     },
        //     bounds: '.text-box',
        //     theme: 'bubble'
        // }
        // 
        // let editor = new Quill('.editor', options);

        let post = this.state || ``
        return (
            <div className='EditPost'>
                <div className='title-box'>
                    <input value={post.section} onChange={e => this.handleChange('section', e.target.value)} />
                </div>
                <div className='text-box'>
                    <input value={post.title} onChange={e => this.handleChange('title', e.target.value)} />
                    <input value={post.subtitle} onChange={e => this.handleChange('subtitle', e.target.value)} />
                    <textarea value={post.body} onChange={e => this.handleChange('body', e.target.value)} />
                </div>
                <div className='subtitle-box'>
                    <div onClick={() => this.save()} >
                        <p>Save Changes</p>
                    </div>
                    <div onClick={() => this.publish()} >
                        <p>{this.props.selectedPost.published ? 'unpublish' : 'publish'}</p>
                    </div>
                </div>
                {/* <div className='text-box'>
                    <div className='editor'>
                        <h1>Title</h1>
                        <h1 className='title' >{post.title}</h1>
                        <h2 className='subtitle' >{post.subtitle}</h2>
                        <p>{post.body}</p>
                    </div>
                </div> */}
                {/* <SlateEditor/> */}
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

export default connect(mapStateToProps, outActions)(EditPost);
