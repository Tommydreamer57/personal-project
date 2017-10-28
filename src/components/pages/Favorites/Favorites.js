import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import PostTile from '../../reusable/PostTile/PostTile';
import { connect } from 'react-redux';
import { getUser, getFavorites, selectPost, removeFavorite } from '../../../ducks/reducer';
import './Favorites.css'

class Favorites extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        if (!this.props.user.id) {
            this.props.getUser()
                .then(user => {
                    this.props.getFavorites(user.value.id)
                })
        }
        else if (!this.props.favorites.length) {
            let userid = this.props.user.id
            this.props.getFavorites(userid)
        }
    }
    render() {
        let { favorites } = this.props
        return (
            <div className='Favorites'>
                <div className='title-box'>
                    Favorites
                </div>
                <div className='subtitle-box'>
                    Select a post below
                </div>
                <div className='post-box'>
                    {
                        favorites.length ?
                            favorites.map((post, i) => {
                                console.log(post)
                                return (
                                    <PostTile
                                        url={`/posts/${post.id || ``}`}
                                        title={post.title || `Post #${i}`}
                                        subtitle={post.subtitle}
                                        key={post.id}
                                        id={post.id}
                                        function={this.props.selectPost}
                                        fav={false}
                                        phfunction={() => this.props.removeFavorite(this.props.user.id, post.id)}
                                    />
                                )
                            })
                            :
                            <PostTile
                                url='/home'
                                title='Home'
                                function={() => { }}
                            />
                    }
                </div>
                <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        favorites: state.favorites,
        user: state.user
    }
}

const outActions = {
    getUser,
    getFavorites,
    selectPost,
    removeFavorite
}

export default connect(mapStateToProps, outActions)(Favorites)
