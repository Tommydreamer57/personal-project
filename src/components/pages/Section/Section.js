import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import PostTile from '../../reusable/PostTile/PostTile';
import { connect } from 'react-redux';
import { selectSection, getPosts, selectPost, clearSelectedSection, clearPosts } from '../../../ducks/reducer';
import './Section.css'

class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [{}, {}, {}, {}, {}, {}]
        }
    }
    componentDidMount() {
        console.log(this.props)
        let { section } = this.props.match.params
        if (!this.props.selectedSection) {
            this.props.selectSection(section)
        }
        console.log(section)
        this.props.getPosts(section);
    }
    componentWillUnmount() {
        console.log('Section unmounting')
        this.props.clearSelectedSection();
        this.props.clearPosts();
    }
    render() {
        return (
            <div className='Section'>
                <div className='title-box'>
                    {this.props.selectedSection}
                </div>
                <div className='subtitle-box'>
                    Select a post below
                </div>
                <div className='post-box'>
                    {
                        this.props.posts.map((post, i) => {
                            let favorite = false;
                            if (this.props.favorites) {
                                if (this.props.favorites.filter(fav => fav.id == post.id).length) {
                                    favorite = true;
                                }
                            }
                            return (
                                <PostTile
                                    url={`/posts/${post.id || ``}`}
                                    title={post.title || `Post #${i}`}
                                    subtitle={post.subtitle}
                                    key={post.id}
                                    id={post.id}
                                    function={this.props.selectPost}
                                    fav={favorite}
                                />
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
        posts: state.posts,
        favorites: state.favorites
    }
}

const outActions = {
    selectSection,
    getPosts,
    selectPost,
    clearSelectedSection,
    clearPosts
}

export default connect(mapStateToProps, outActions)(Section)
