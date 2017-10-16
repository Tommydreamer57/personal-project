import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

// NAVIGATION TOGGLE - MOBILE ONLY

export function NavigationToggle(props) {
    return (
        <div className='NavigationToggle'>
            <div className='nav-line' />
            <div className='nav-line' />
            <div className='nav-line' />
        </div>
    )
}

// NAVIGATION BAR BUTTONS

export function NavigationButton(props) {
    return (
        <Link to={props.url} className='NavigationButton'>
            {props.children}
        </Link>
    )
}

// LOGIN BUTTON

export function LoginButton(props) {
    return (
        <a className='LoginButton' href={process.env.REACT_APP_LOGIN}>
            {props.children}
        </a>
    )
}

// LOGOUT BUTTON

export function LogoutButton(props) {
    return (
        <a className='LogoutButton' href={process.env.REACT_APP_LOGOUT}>
            {props.children}
        </a>
    )
}

// REPLY TO COMMENT BUTTON

export function Reply(props) {
    return (
        <div className='Reply' onClick={props.function} >
            {props.children}
        </div>
    )
}

// SUBMIT RESPONSE BUTTON

export function Submit(props) {
    return (
        <div className='Submit' onClick={props.function} >
            {props.children}
        </div>
    )
}

// EDIT POST BUTTON <ADMIN>

export function EditPostButton(props) {
    return (
        <Link to={`/admin/editpost/${props.postid}`} className='EditPostButton' >
            {props.children}
        </Link>
    )
}

// FAVORITE BUTTON <HEART>

export function FavoriteButton(props) {
    return (
        <div className='FavoriteButton' onClick={props.function} >
            <div className={props.fav ? 'favsquare' : 'unfavsquare'} />
            <div className={props.fav ? 'favsquare' : 'unfavsquare'} />
            <div className={props.fav ? 'favsquare' : 'unfavsquare'} />
        </div>
    )
}

// DEFAULT BUTTON ?

export default function Button(props) {
    return (
        <div className='Button'>

        </div>
    )
}
