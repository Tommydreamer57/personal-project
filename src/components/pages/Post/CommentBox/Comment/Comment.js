import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertWarning, alertAdd } from '../../../../../ducks/reducer';
import { Reply, Submit } from '../../../../reusable/Buttons/Button';
import { UserTile } from '../../../../reusable/PostTile/PostTile';
import Response from './Response/Response';
import axios from 'axios';

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showResponses: false,
            responses: [],
            responding: false,
            input: ``
        }
        this.toggleShowResponses = this.toggleShowResponses.bind(this);
        this.toggleResponding = this.toggleResponding.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitResponse = this.submitResponse.bind(this);
    }
    toggleShowResponses() {
        this.setState({
            showResponses: !this.state.showResponses
        })
    }
    toggleResponding() {
        if (this.props.user.id) {
            this.setState({
                responding: !this.state.responding
            })
        }
        else {
            this.props.alertWarning('please log in to respond to comments')
        }
    }
    handleChange(val) {
        console.log(val)
        this.setState({
            input: val
        })
    }
    submitResponse() {
        console.log('comment submitting response')
        console.log(this.props.id)
        console.log(this.props.user.id)
        console.log(this.state.input)
        axios.post(`/responses/${this.props.id}`, {
            userid: this.props.user.id,
            body: this.state.input
        })
            .then(response => {
                console.log('comment submitted response')
                console.log(response.data)
                this.setState({
                    responses: response.data,
                    responding: false,
                    input: ``
                })
            })
    }
    componentDidMount() {
        console.log('comment getting responses')
        console.log(this.props.id)
        axios.get(`/responses/${this.props.id}`)
            .then(response => {
                console.log('comment got responses')
                console.log(response.data)
                this.setState({
                    responses: response.data
                })
            })
    }
    render() {
        // console.log(this.state)
        let { responses, showResponses } = this.state || null;
        return (
            <div className='Comment' >
                <UserTile
                    imgurl={this.props.imgurl || ``}
                    name={this.props.name}
                    date={this.props.date}
                />    
                {/* <div className='user-tile'>
                    <img className='comment-avatar' src={this.props.imgurl || ''} />
                    {this.props.name}&nbsp;&nbsp;&nbsp;at&nbsp;&nbsp;
                    {this.props.date}
                </div> */}
                {this.props.body}
                {
                    responses ?
                        showResponses ?
                            <div className='response-box'>
                                {
                                    responses.map((response, i) => {
                                        {/* console.log(response) */ }
                                        return (
                                            <Response
                                                key={i}
                                                imgurl={response.imgurl}
                                                name={response.first_name || response.username}
                                                date={response.date}
                                            >
                                                {response.body}
                                            </Response>
                                        )
                                    })
                                }
                            </div>
                            :
                            null
                        :
                        null
                }
                {
                    responses.length ?
                        <Reply function={this.toggleShowResponses} >
                            {
                                showResponses ?
                                    'Hide responses'
                                    :
                                    'Show responses'
                            }
                        </Reply>
                        :
                        null
                }
                <Reply function={this.toggleResponding} >Reply</Reply>
                {
                    this.state.responding ?
                        <input className='response-input' type='text' onChange={e => this.handleChange(e.target.value)} value={this.state.input} />
                        :
                        null
                }
                {
                    this.state.responding ?
                        <Submit className='submit' function={this.submitResponse} >Submit</Submit>
                        :
                        null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const outActions = {
    alertWarning,
    alertAdd
}

export default connect(mapStateToProps, outActions)(Comment)
