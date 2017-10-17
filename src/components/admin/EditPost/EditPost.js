import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, getComments } from '../../../ducks/reducer';
import Navbar from '../../reusable/Navbar/Navbar';
import axios from 'axios';

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
        this.submit = this.submit.bind(this);
    }
    handleChange(target, value) {
        // console.log(target)
        // console.log(value)
        // console.log(this.state)
        this.setState({
            [target]: value
        })
    }
    submit() {
        axios.post(`/admin/editpost/${this.state.id}`, this.state)
            .then(response => {
                console.log(response.data)
            })
    }
    componentDidMount() {
        let { postid } = this.props.match.params;
        let post = this.props.selectedPost || ``;
        if (!post) {
            console.log('edit post selecting post')
            this.props.selectPost(postid).then(() => {
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
                <div onClick={() => this.submit()} >
                    <p>Save Changes</p>
                </div>
                <Navbar />
            </div>
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
    selectPost,
    getComments
}

export default connect(mapStateToProps, outActions)(EditPost);
