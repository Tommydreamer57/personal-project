import React, { Component } from 'react';



export default class InfoEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentEditable: false
        }
    }
    toggleEdit() {

    }
    render() {
        return (
            <div className='InfoEditor'>
                <div className='title-box'>
                    Section:&nbsp;
                    {
                        this.state.contentEditable ?
                            <input />
                            :
                            `${this.props.section}`
                    }
                </div>
            </div>
        )
    }
}
