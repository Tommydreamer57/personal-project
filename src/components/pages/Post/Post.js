import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { FavoriteButton, EditPostButton } from '../../reusable/Buttons/Button';
import CommentBox from './CommentBox/CommentBox';
import { connect } from 'react-redux';
import { getUser, selectPost, getComments, getFavorites, addFavorite, removeFavorite } from '../../../ducks/reducer';
import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alertType: 'add-box',
            alert: 'Added to favorites'
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
            console.log('post selecting post')
            this.props.selectPost(postid)
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
                    <div className={this.props.alertClass} >
                        {this.props.alert}
                    </div>
                    <FavoriteButton onClick={() => console.log('clicked')} function={() => this.toggleFav()} fav={this.props.postIsFavorite} />
                    <div className='title'>
                        {post.title || ``}
                    </div>
                    <div className='subtitle'>
                        {post.subtitle || ``}
                    </div  >
                    {post.body || ``}
                    <div className='author'>
                        Written by {post.first_name || post.username}
                    </div>
                    <div className='date'>
                        {post.date}
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
        postIsFavorite: state.postIsFavorite,
        alertClass: state.alertClass,
        alert: state.alert
    }
}

const outActions = {
    getUser,
    selectPost,
    getComments,
    getFavorites,
    addFavorite,
    removeFavorite
}

export default connect(mapStateToProps, outActions)(Post)
