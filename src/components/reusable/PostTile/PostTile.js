import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostTile.css';

// USER TILE

function month(num) {
    switch (num) {
        case 0:
            return 'January'
        case 1:
            return 'February'
        case 2:
            return 'March'            
        case 3:
            return 'April'            
        case 4:
            return 'May'            
        case 5:
            return 'June'            
        case 6:
            return 'July'            
        case 7:
            return 'August'            
        case 8:
            return 'September'            
        case 9:
            return 'October'
        case 10:
            return 'November'            
        case 11:
            return 'December'            
    }
}

export function UserTile(props) {
    let date = new Date(props.date)
    console.log(date)
    return (
        <div className='UserTile'>
            <img className='avatar' src={props.imgurl || `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`} />
            {props.name}&nbsp;&nbsp;&nbsp;at&nbsp;&nbsp;{`${month(date.getMonth())} ${date.getDate()} ${date.getFullYear()}`}
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
