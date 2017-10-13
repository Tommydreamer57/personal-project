import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import PostTile from '../../reusable/PostTile/PostTile';
import { connect } from 'react-redux';
import { getFavorites, selectPost } from '../../../ducks/reducer';
import './Favorites.css'

class Favorites extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
    }
    render() {
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
                        this.props.posts.map((post, i) => {
                            console.log(post)
                            return (
                                <PostTile url={`/posts/${post.id || ``}`} title={post.title || `Post #${i}`} key={post.id} id={post.id} function={this.props.selectPost} />
                            )
                        })
                    }
                </div>
                <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedSection: state.selectedSection,
        posts: state.posts
    }
}

const outActions = {
    getFavorites,
    selectPost
}

export default connect(mapStateToProps, outActions)(Favorites)
