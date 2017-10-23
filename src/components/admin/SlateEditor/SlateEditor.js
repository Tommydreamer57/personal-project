import React, { Component } from 'react';
import Navbar from '../../reusable/Navbar/Navbar';
import { connect } from 'react-redux';
import { adminSelectPost, getComments } from '../../../ducks/reducer';
import axios from 'axios';

import { Editor } from 'slate-react';
import { State } from 'slate';
import html from './html-rules';

const existingState = '<h1>Hello !!!</h1>'

class SlateEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // NORMAL STATE
            id: 0,
            section: ``,
            subsection: ``,
            title: ``,
            subtitle: ``,
            body: ``,
            imgurl: ``,
            // SLATE STATE
            state: html.deserialize(existingState),
            schema: {
                nodes: {
                    // section: props => <h1 {...props.attributes}>{props.children}</h1>,
                    // subsection: props => <h2>{...props.attributes}>{props.children}</h2>,
                    // title: props => <h3 {...props.attributes}>{props.children}</h3>,
                    // subtitle: props => <h4 {...props.attriutes}>{props.children}</h4>,
                    code: props => <pre {...props.attributes}><code>{props.children}</code></pre>,
                    paragraph: props => <p {...props.attributes}>{props.children}</p>,
                    quote: props => <blockquote {...props.attributes}>{props.children}</blockquote>
                },
                marks: {
                    bold: props => <strong>{props.children}</strong>,
                    italic: props => <i>{props.children}</i>
                }
            }
        }
        this.ctrl = false
    }
    save = () => {
        let string = html.serialize(this.state.state)
        axios.post(`/admin/slate/body/${this.state.id}`, {string})
            .then(response => {
                console.log(response.data)
            })
    }
    onChange = ({ state }) => {
        if (state.document != this.state.document) {
            let string = html.serialize(state)
            console.log(string)
            localStorage.setItem('content', string)
        }
        this.setState({ state })
    }
    onKeyDown = (event, change) => {
        // console.log(change.state)
        // SETS CONTROL TO TRUE WHEN PRESSED
        if (event.key == 'Control') {
            this.ctrl = true
        }
        // RETURN IF CONTROL IS NOT PRESSED
        if (!this.ctrl) return
        else switch (event.key) {
            // CHANGE BLOCK BETWEEN CODE AND PARAGRAPH ON '`'
            case '`':
                let isCode = change.state.blocks.some(block => block.type == 'code')
                event.preventDefault();
                change.setBlock(isCode ? 'paragraph' : 'code')
                return true;
            case 'b':
                event.preventDefault();
                change.toggleMark('bold');
                return true;
            case 'i':
                event.preventDefault();
                change.toggleMark('italic')
                return true;
            default:
                return;
        }
    }
    onKeyUp = (event, change) => {
        // SETS CONTROL BACK TO FALSE WHEN RELEASED
        if (event.key == 'Control') {
            this.ctrl = false
        }
    }
    save() {

    }
    componentDidMount() {
        let { postid } = this.props.match.params;
        let post = this.props.selectedPost || ``;
        if (!post) {
            console.log('edit post selecting post')
            this.props.adminSelectPost(postid)
                .then(() => {
                    post = this.props.selectedPost
                    this.setState({
                        id: postid,
                        section: post.section,
                        subsection: post.subsection,
                        title: post.title,
                        subtitle: post.subtitle,
                        body: post.body,
                        imgurl: post.imgurl,
                        state: html.deserialize(post.body)
                    })
                })
        }
        else {
            this.setState({
                id: postid,
                section: post.section,
                subsection: post.subsection,
                title: post.title,
                subtitle: post.subtitle,
                body: post.body,
                imgurl: post.imgurl,
                state: html.deserialize(post.body)
            })
        }
        console.log('edit post getting comments')
        this.props.getComments(postid)
    }
    render() {
        let post = this.state || ``
        // let jsx = (
        //     <Editor state={html.deserialize(post.body)} />
        // )
        // console.log(html.deserialize(post.body).blocks._tail.array[0].text)
        // console.log(jsx.props.state)
        return (
            <div className='SlateEditor'>
                <div className='title-box'>Section: {post.section}</div>
                <div className='subtitle-box'>Title: {post.title}</div>
                {/* <div className='text-box'>{post.body}</div> */}
                {/* <div className='text-box'>
                    <Editor
                        state={html.deserialize(post.body)}
                    />
                </div> */}
                {/* <div className='text-box'>{jsx.props.state}</div> */}
                <div className='text-box editor'>
                    <Editor
                        schema={this.state.schema}
                        state={this.state.state}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.onKeyUp}
                    />
                    <div onClick={this.save}>Save</div>
                </div>
                <Navbar />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        selectedPost: state.selectedPost
    }
}

const outActions = {
    adminSelectPost,
    getComments
}

export default connect(mapStateToProps, outActions)(SlateEditor);
