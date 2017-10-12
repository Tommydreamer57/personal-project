import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { FavoriteButton } from '../../reusable/Buttons/Button';
import { connect } from 'react-redux';
import { getUser, selectPost, getFavorites } from '../../../ducks/reducer';
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
        this.setState({
            fav: !this.state.fav
        })
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
            let fave = this.props.favorites.filter(fav => fav.postid == this.props.selectedPost[0].id)
            console.log(fave)
            return fave.length > 0;
        }
        console.log(this.props)
        let post = this.props.selectedPost[0] || ``;
        // console.log(post)
        console.log(this.props.favorites)
        return (
            <div className='Post'>
                <div className='title-box'>
                    {post.section || ``}
                </div>
                <div className='text-box'>
                    <FavoriteButton onClick={() => this.toggleFav()} fav={isFavorite()} />
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
    getFavorites
}

export default connect(mapStateToProps, outActions)(Post)
