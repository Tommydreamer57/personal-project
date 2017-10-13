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
            alertType: 'add-box',
            alert: 'Added to favorites',
            fav: false
        }
        this.toggleFav = this.toggleFav.bind(this);
    }
    toggleFav() {
        this.setState({
            fav: !this.state.fav
        })
        this.props.postIsFavorite ?
            this.props.removeFavorite(this.props.user.id, this.props.selectedPost.id).then(this.setState({
                fav: this.props.postIsFavorite
            }))
            :
            this.props.addFavorite(this.props.user.id, this.props.selectedPost.id).then(this.setState({
                fav: this.props.postIsFavorite
            }))
    }
    componentDidMount() {
        // GETS POST FROM DB IF NOT ALREADY ON REDUX STATE
        let { postid } = this.props.match.params
        if (!this.props.selectedPost) {
            this.props.selectPost(postid)
        }
        // GETS USER FROM DB IF NOT ALREADY ON REDUX STATE
        // THEN GETS FAVORITES FROM REDUX STATE
        if (!this.props.user.id) {
            this.props.getUser().then(user => this.props.getFavorites(user.value.id))
        }
        // GETS FAVORITES FROM REDUX STATE
        else if (!this.props.favorites.length) {
            let userid = this.props.user.id
            this.props.getFavorites(userid)
        }
        // CHECK IF POST IS FAVORITE
        // console.log(this.state)
        // console.log(this.props.postIsFavorite)
        // this.setState({
        //     fav: this.props.postIsFavorite
        // }, () => console.log(this.state))
    }
    componentWillReceiveProps(props) {
        this.setState({
            fav: props.postIsFavorite
        })
    }
    render() {
        console.log(this.state.fav)
        console.log(this.props.postIsFavorite)
        let post = this.props.selectedPost || ``;
        return (
            <div className='Post'>
                <div className='title-box'>
                    {post.section || ``}
                </div>
                <div className='text-box'>
                    <div className={this.state.alertType} >
                        {this.state.alert}
                    </div>
                    <FavoriteButton onClick={() => this.toggleFav()} fav={this.state.fav} />
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
        selectedPost: state.selectedPost,
        postIsFavorite: state.postIsFavorite
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
