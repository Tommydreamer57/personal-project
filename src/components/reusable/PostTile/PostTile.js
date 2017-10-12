import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostTile.css';

export default function PostTile(props) {
    return (
        <div className='PostTile'>
            <Link to={props.url || `/post`} >
                <h1 className='title'>{props.title}</h1>
            </Link>
        </div>
    )

}

export function SectionTile(props) {
    return (
        <div className='PostTile'>
            <Link to={props.url || `/section`} >
                <div className='PostTile' onClick={() => props.function(props.title)} >
                    <h1 className='title'>{props.title}</h1>
                </div>
            </Link>
        </div>
    )
}
