import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import PostTile from '../../reusable/PostTile/PostTile';
import './Section.css'

export default class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [{}, {}, {}, {}, {}, {}]
        }
    }
    render() {
        return (
            <div className='Section'>
                <div className='title-box'>
                    Section Title
                </div>
                <div className='subtitle-box'>
                    This is the subtitle
                </div>
                <div className='post-box'>
                    {
                        this.state.posts.map((post, i) => {
                            return (
                                <PostTile title={`post ${i}`} />
                            )
                        })
                    }
                </div>
                <Navbar />
            </div>
        )
    }
}