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
        axios.get(`/posts/${this.props.title}`)
            .then(response => {
                console.log('SectionTile got posts')
                console.log(this.props.title)
                console.log(response.data)
                this.setState({
                    posts: response.data
                })
            })
        console.log('SectionTile getting posts')
        console.log(this.props.title)

    }
    render() {
        return (
            <div className='SectionTile' onClick={() => this.props.function(this.props.title)} >
                <Link to={this.props.url || `/section`} >
                    <h1 className='tile-title'>{this.props.title}</h1>
                </Link>
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
                                key={post.id}
                                id={post.id}
                                function={this.props.selectPost}
                                fav={favorite}
                            />
                        )
                    })
                }
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