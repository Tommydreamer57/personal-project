import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostTile.css';
import DateStamp, { month } from '../dates/dates';
import { Favorite } from '../Buttons/Button';

// USER TILE

export function Avatar(props) {
    return (
        <div className='Avatar'>
            {props.name ? props.name.slice(0, 2).toUpperCase() : null}
        </div>
    )
}

export function UserTile({ user }) {
    console.log(user)
    return (
        <div className='UserTile'>
            <div className='user-avatar'>
                <Avatar name={user.first_name || user.username} />
            </div>
            <div className='user-tile'>
                <div className='user-header'>
                    <div>ID&nbsp;{user.id}&nbsp;</div>
                    <div>{user.first_name}&nbsp;{user.last_name}&nbsp;</div>
                    <div>{user.username}&nbsp;</div>
                </div>
                <div className='user-info'>
                    <div className='user-body'>
                        <div>{user.email}&nbsp;</div>
                        <div>{user.provider}&nbsp;</div>
                    </div>
                    <div className='user-body'>
                        <div className='visits'>Total visits:&nbsp;{user.visits}</div>
                        <div className='visits'>Last visit:&nbsp;<DateStamp date={user.date} /></div>
                    </div>
                </div>
            </div>
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
                </div>
                <div className='author-info'>
                    {props.author_info || 'Lorem impsum dolor sit amet, blandit est sodales, pellentesque nulla. Nam vitae lorem tempus, pharetra mi sed, porta metus. Integer ultrices semper neque ut eleifend. Nunc ullamcorper augue ut sapien varius rhoncus. Pellentesque porttitor luctus enim quis congue.'}
                </div>
            </div>
        </div>
    )
}

// POST TILE - SECTION PAGE - DEFAULT EXPORT

export default function PostTile(props) {
    return (
        <div className={props.published ? 'PostTile' : 'PostTile unpublished'}>
            {/* <div className='tile-body'> */}
            <Link className='tile-body' to={props.url || `/post`} onClick={() => props.function(props.id)} >
                <h1 className='tile-title'>{props.title}</h1>
                {
                    props.parent == 'admin' ?
                        <DateStamp date={props.date} />
                        :
                        <h2 className='tile-subtitle'>{props.subtitle}</h2>
                }
            </Link>
            {/* </div> */}
            <div className='tile-favorite-button'>
                {
                    props.fav ?
                        <div className='button-wrapper'>
                            <Favorite fav={props.fav} />
                        </div>
                        :
                        props.parent == 'admin' ?
                            <Link to={`/admin/editpost/${props.id}`} className='button-placeholder' onClick={props.phfunction} >
                                <div className='circle'>
                                    <div className='inner-circle' />
                                </div>
                            </Link>
                            :
                            <div className='button-placeholder' onClick={props.phfunction} >
                                <div className='circle'>
                                    <div className='inner-circle' />
                                </div>
                            </div>
                }
            </div>
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
