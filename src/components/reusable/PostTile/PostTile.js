import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostTile.css';
import DateStamp, { month } from '../dates/dates';

// USER TILE

export function Avatar(props) {
    return (
        <div className='Avatar'>
            {props.name ? props.name.slice(0, 2).toUpperCase() : null}
        </div>
    )
}

export function UserTile(props) {
    let date = new Date(props.date)
    console.log(date)
    return (
        <div className='UserTile'>
            {/* <img className='avatar' src={props.imgurl || `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`} /> */}
            {/* <div className='avatar'>{props.name ? props.name.slice(0,2).toUpperCase() : null}</div> */}
            {props.name}&nbsp;&nbsp;&nbsp;at&nbsp;&nbsp;{`${date.getHours()}:${date.getMinutes()} on ${month(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`}
        </div>
    )
}

export function AuthorTile(props) {
    return (
        <div className='AuthorTile'>
            <Avatar name={props.name} />
            <div className='author-tile'>
                <div className='author-header'>
                    <div className='name'>
                        {props.name}
                    </div>
                    <div className='date' >
                        <div>Published on</div>
                        <DateStamp date={props.date} />
                    </div>
                </div>
                <div className='author-info'>
                    {props.author_info || 'Lorem impsum dolor sit amet...'}
                </div>
            </div>
        </div>
    )
}

// POST TILE - SECTION PAGE - DEFAULT EXPORT

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
