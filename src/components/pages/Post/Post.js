import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { FavoriteButton, EditPostButton } from '../../reusable/Buttons/Button';
import { AuthorTile, Avatar } from '../../reusable/PostTile/PostTile';
import DateStamp from '../../reusable/dates/dates';
import CommentBox from './CommentBox/CommentBox';
import { connect } from 'react-redux';
import { getUser, adminSelectPost, selectPost, getComments, getFavorites, addFavorite, removeFavorite, clearSelectedPost } from '../../../ducks/reducer';
import './Post.css';
// import Prism, { PrismCode } from 'react-prism';

import { Editor } from 'slate-react';
import html, { schema } from '../../admin/SlateEditor/html-rules';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alertType: 'add-box',
            alert: 'Added to favorites',
            // state: html.deserialize('<h1>Hello</h1>')
        }
        this.toggleFav = this.toggleFav.bind(this);
    }
    toggleFav() {
        this.props.postIsFavorite ?
            this.props.removeFavorite(this.props.user.id, this.props.selectedPost.id)
            :
            this.props.addFavorite(this.props.user.id, this.props.selectedPost.id)
    }
    componentDidMount() {
        // GETS POST FROM DB IF NOT ALREADY ON REDUX STATE
        let { postid } = this.props.match.params
        if (!this.props.selectedPost) {
            if (this.props.user.admin) {
                console.log('post selecting admin post')
                this.props.adminSelectPost(postid)
            }
            else {
                console.log('post selecting post')
                this.props.selectPost(postid)
            }
        }
        console.log('post getting comments')
        this.props.getComments(postid)
        // GETS USER FROM DB IF NOT ALREADY ON REDUX STATE
        // THEN GETS FAVORITES FROM REDUX STATE
        if (!this.props.user.id) {
            console.log('post getting user')
            this.props.getUser()
                .then(user => {
                    this.props.getFavorites(user.value.id)
                })
        }
        // GETS FAVORITES FROM REDUX STATE
        else if (!this.props.favorites.length) {
            console.log('post getting favorites')
            let userid = this.props.user.id
            this.props.getFavorites(userid)
        }
    }
    componentWillUnmount() {
        this.props.clearSelectedPost()
    }
    render() {
        // console.log(this.state.fav)
        console.log(this.props.postIsFavorite)
        let post = this.props.selectedPost || ``;
        let { user } = this.props || ``;
        return (
            <div className='Post'>
                <div className='title-box'>
                    {post.section || ``}
                </div>
                <div className='text-box'>
                    <div className={'alert-box ' + this.props.alertClass} >
                        {this.props.alert}
                    </div>
                    <FavoriteButton function={() => this.toggleFav()} fav={this.props.postIsFavorite} />
                    <div className='title'>
                        {post.title || ``}
                    </div>
                    <div className='subtitle'>
                        {post.subtitle || ``}
                    </div>
                    <Editor
                        state={this.props.selectedPostBody}
                        schema={schema}
                        readOnly={true}
                    />
                    <AuthorTile
                        imgurl={post.userimgurl}
                        name={post.first_name || post.username}
                        date={post.date}
                    />
                    <div className='date'>
                        Published on &nbsp;
                        <DateStamp date={post.date} />
                    </div>
                    <CommentBox />
                </div>
                {
                    user.admin ?
                        <EditPostButton postid={post.id} >Edit Post</EditPostButton>
                        :
                        null
                }
                <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        favorites: state.favorites,
        selectedPost: state.selectedPost,
        selectedPostBody: state.selectedPostBody,
        postIsFavorite: state.postIsFavorite,
        alertClass: state.alertClass,
        alert: state.alert
    }
}

const outActions = {
    getUser,
    adminSelectPost,
    selectPost,
    getComments,
    getFavorites,
    addFavorite,
    removeFavorite,
    clearSelectedPost
}

export default connect(mapStateToProps, outActions)(Post)
