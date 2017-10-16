import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, postComment } from '../../../../ducks/reducer';
import Comment from './Comment/Comment';
import { Reply, Submit } from '../../../reusable/Buttons/Button';
import './CommentBox.css';

class CommentBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commenting: false,
            input: ``
        }
        this.toggleCommenting = this.toggleCommenting.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }
    toggleCommenting() {
        this.setState({
            commenting: !this.state.commenting
        })
    }
    handleChange(val) {
        console.log(val)
        this.setState({
            input: val
        })
    }
    submitComment() {
        console.log(this.props.selectedPost)
        console.log(this.props.user)
        console.log(this.state.input)
        this.props.postComment(this.props.selectedPost.id, this.props.user.id, this.state.input)
            .then(() => {
                this.setState({
                    commenting: false,
                    input: ``
                })
            })
    }
    render() {
        let { comments } = this.props || null;
        return (
            <div className='CommentBox'>
                <div className='subtitle'>Comments</div>
                {
                    comments ?
                        comments.map((comment, i) => {
                            {/* console.log(comment) */ }
                            return (
                                <Comment key={i} id={comment.id} body={comment.body} name={comment.first_name || comment.username} date={comment.date} />
                            )
                        })
                        :
                        null
                }
                <Reply function={this.toggleCommenting} >Click here to leave a response</Reply>
                {
                    this.state.commenting ?
                        <input className='comment-input' type='text' onChange={e => this.handleChange(e.target.value)} />
                        :
                        null
                }
                {
                    this.state.commenting ?
                        <Submit className='submit' function={() => { console.log('it worked'); this.submitComment() }} >Submit</Submit>
                        :
                        null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        selectedPost: state.selectedPost,
        comments: state.comments,
        selectedPost: state.selectedPost
    }
}

const outActions = {
    getComments,
    postComment
}

export default connect(mapStateToProps, outActions)(CommentBox);
