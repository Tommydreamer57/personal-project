import React, { Component } from 'react';
import { Reply } from '../../../../reusable/Buttons/Button';
import Response from './Response/Response';
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
        let { responses } = this.state || null;
        return (
            <div className='Comment' >
                {this.props.name}:
                {this.props.body}
                {this.props.date}
                {
                    responses ?
                        <div className='response-box'>
                            {
                                responses.map((response, i) => {
                                    {/* console.log(response) */}
                                    return (
                                        <Response >
                                            {response.first_name || response.username}: 
                                            {response.body}
                                            {response.date}
                                        </Response>
                                    )
                                })
                            }
                        </div>
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
