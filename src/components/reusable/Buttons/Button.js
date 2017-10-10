import React, { Copmonent } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export function NavigationButton(props) {
    return (
        <Link to={props.url} className='NavigationButton'>
            {props.children}
        </Link>
    )
}

export function FavoriteButton(props) {
    return (
        <div className='FavoriteButton' onClick={props.onClick} >
            <div className={props.fav ? 'favsquare' : 'unfavsquare'} />
            <div className={props.fav ? 'favsquare' : 'unfavsquare'} />
            <div className={props.fav ? 'favsquare' : 'unfavsquare'} />
        </div>
    )
}

export default function Button(props) {
    return (
        <div className='Button'>

        </div>
    )
}
