import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostTile.css';

// POST TILE - SECTION PAGE

export default function PostTile(props) {
    return (
        <div className='PostTile' onClick={() => props.function(props.id)} >
            <Link to={props.url || `/post`} >
                <h1 className='tile-title'>{props.title}</h1>
            </Link>
        </div>
    )

}

// SECTION TILE - HOME PAGE

export function SectionTile(props) {
    return (
        <div className='PostTile' onClick={() => props.function(props.title)} >
            <Link to={props.url || `/section`} >
                <h1 className='tile-title'>{props.title}</h1>
            </Link>
        </div>
    )
}

// HOME TILE - FAVORITES PAGE

export function HomeTile(props) {
    return (
        <div className='PostTile' >
            <Link to={props.url || `/home`} >
                <h1 className='tile-title'>{props.title}</h1>
            </Link>
        </div>
    )
}
