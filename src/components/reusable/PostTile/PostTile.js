import React, { Component } from 'react';
import './PostTile.css';

export default function PostTile(props) {
    return (
        <div className='PostTile'>
            <h1 className='title'>{props.title}</h1>
        </div>
    )

}
