import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Reply, Submit } from '../../../../reusable/Buttons/Button';
import Response from './Response/Response';
import axios from 'axios';

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            responses: [],
            responding: false,
            input: ``
        }
        this.toggleResponding = this.toggleResponding.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitResponse = this.submitResponse.bind(this);
    }
    toggleResponding() {
        this.setState({
            responding: !this.state.responding
        })
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
                                    {/* console.log(response) */ }
                                    return (
                                        <Response key={i} >
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

}

export default connect(mapStateToProps, outActions)(Comment)
