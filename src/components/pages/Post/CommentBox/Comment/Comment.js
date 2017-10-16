import React, { Component } from 'react';
import { Reply } from '../../../../reusable/Buttons/Button';
import axios from 'axios';

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            responses: [],
            commenting: false,
            input: ``
        }
        this.toggleCommenting = this.toggleCommenting.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    toggleCommenting() {
        this.setState({
            commenting: !this.state.commenting
        })
    }
    handleChange(val) {
        console.log(val)
        this.setState({
            input: val
        })
    }
    componentDidMount() {
        axios.get(`/responses/${this.props.id}`)
            .then(response => {
                this.setState({
                    responses: response.data
                })
            })
    }
    render() {
        console.log(this.state)
        return (
            <div className='Comment' >
                {this.props.name}:
                {this.props.body}
                {this.props.date}
                {
                    this.state.responses.length ?
                        this.state.responses.map((response, i) => {
                            return (
                                <div className='response' >{response.body}</div>
                            )
                        })
                        :
                        null
                }
                <Reply function={this.toggleCommenting} >Reply</Reply>
                {
                    this.state.commenting ?
                        <input className='response-input' type='text' onChange={e => this.handleChange(e.target.value)} value={this.state.input} />
                        :
                        null
                }
            </div>
        )
    }
}
