import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../../../ducks/reducer';
import Comment from './Comment/Comment';
import './CommentBox.css';

class CommentBox extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {

    }
    render() {
        let { comments } = this.props || null;
        return (
            <div className='CommentBox'>
                <div className='subtitle'>Comments</div>
                {
                    comments ?
                        comments.map((comment, i) => {
                            return (
                                <Comment body={comment.body} />
                            )
                        })
                        :
                        null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        selectedPost: state.selectedPost
    }
}

const outActions = {
    getComments
}

export default connect(mapStateToProps, outActions)(CommentBox);
