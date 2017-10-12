import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { FavoriteButton } from '../../reusable/Buttons/Button';
import { connect } from 'react-redux';
import { getUser, selectPost, getFavorites, addFavorite, removeFavorite } from '../../../ducks/reducer';
import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            section: 'Section Title',
            title: 'Title',
            subtitle: 'This is the subtitle',
            body: '',
            fav: false
        }
        this.toggleFav = this.toggleFav.bind(this);
    }
    toggleFav() {

    }
    componentDidMount() {
        let { postid } = this.props.match.params
        if (!this.props.selectedPost) {
            this.props.selectPost(postid)
        }
        if (!this.props.user.id) {
            this.props.getUser().then(user => this.props.getFavorites(user.value.id))
        }
        // console.log(this.props.user.id)
        console.log(this.props)
        if (this.props.user.id) {
            let userid = this.props.user.id
            this.props.getFavorites(userid)
        }
    }
    render() {
        let isFavorite = () => {
            console.log(this.props.favorites)
            if (this.props.favorites.length) {
                let fave = this.props.favorites.filter(fav => fav.postid == this.props.selectedPost[0].id)
                console.log(fave)
                return fave.length > 0;
            }
            return false;
        }
        console.log(this.props)
        let post = this.props.selectedPost[0] || ``;
        // console.log(post)
        console.log(this.props.favorites)
        let { addFavorite, removeFavorite } = this.props
        let userid = this.props.user.id
        let postid = post.id
        return (
            <div className='Post'>
                <div className='title-box'>
                    {post.section || ``}
                </div>
                <div className='text-box'>
                    <FavoriteButton onClick={() => isFavorite() ? removeFavorite(userid, postid) : addFavorite(userid, postid)} fav={isFavorite()} /> {/*COMPONENT DOES NOT RERENDER ON CLICK MAYBE USE LOCAL STATE TO RERENDER AND FIRE ANIMATIONS IMMEDIATELY AND MAYBE DISPLAY THE DB RESPONSE ON THE SCREEN TO LET USER KNOW IT DID OR DIDN'T WORK*/}
                    <div className='title'>
                        {post.title || ``}
                    </div>
                    <div className='subtitle'>
                        {post.subtitle || ``}
                    </div>
                    {post.body || ``}
                </div>
                <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        favorites: state.favorites,
        selectedPost: state.selectedPost
    }
}

const outActions = {
    getUser,
    selectPost,
    getFavorites,
    addFavorite,
    removeFavorite
}

export default connect(mapStateToProps, outActions)(Post)
