import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import PostTile from '../../reusable/PostTile/PostTile';
import { connect } from 'react-redux';
import { selectSection, getPosts } from '../../../ducks/reducer';
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
    render() {
        return (
            <div className='Section'>
                <div className='title-box'>
                    {this.props.selectedSection}
                </div>
                <div className='subtitle-box'>
                    This is the subtitle
                </div>
                <div className='post-box'>
                    {
                        this.props.posts.map((post, i) => {
                            console.log(post)
                            return (
                                <PostTile title={post.title || `Post #${i}`} />
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
    selectSection,
    getPosts
}

export default connect(mapStateToProps, outActions)(Section)
