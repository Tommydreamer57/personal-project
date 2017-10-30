import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostTile from '../../../reusable/PostTile/PostTile';
import { selectPost } from '../../../../ducks/reducer';
import './SectionTile.css';

class SectionTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }

    }
    componentDidMount() {
        if (this.props.parent == 'admin') {
            axios.get(`/api/admin/posts/${this.props.title}`)
                .then(response => {
                    console.log('SectionTile got posts')
                    console.log(this.props.title)
                    console.log(response.data)
                    this.setState({
                        posts: response.data
                    })
                })
        }
        else {
            axios.get(`/api/posts/${this.props.title}`)
                .then(response => {
                    console.log('SectionTile got posts')
                    console.log(this.props.title)
                    console.log(response.data)
                    this.setState({
                        posts: response.data
                    })
                })
            axios.get(`/api/subsections/${this.props.title}`)
                .then(response => {
                    console.log('SectionTile got subsections')
                    console.log(response.data)
                    this.setState({
                        subsections: response.data
                    })
                })
        }
        console.log('SectionTile getting posts')
        console.log(this.props.title)
    }
    render() {
        console.log(this.props.title)
        console.log(this.props.parent)
        return (
            <div className='SectionTile'>
                <div className='section-title-wrapper' onClick={() => this.props.function(this.props.title)} >
                    <Link to={this.props.url || `/section`} >
                        <h1 className='subtitle'>{this.props.title}</h1>
                    </Link>
                </div>
                <div className='section'>
                    {
                        this.state.posts.map((post, i) => {
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
                                    date={post.date}
                                    key={post.id}
                                    id={post.id}
                                    function={this.props.parent == 'admin' ? this.props.adminSelectPost : this.props.selectPost}
                                    phfunction={this.props.selectPost}
                                    fav={this.props.parent == 'admin' ? false : favorite}
                                    parent={this.props.parent}
                                    published={post.published}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        favorites: state.favorites
    }
}

const outActions = {
    selectPost
}

export default connect(mapStateToProps, outActions)(SectionTile)