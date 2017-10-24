import React from 'react';
import { UserTile } from '../../../../../reusable/PostTile/PostTile';

export default function Response(props) {
    return (
        <div className='Response'>
            <UserTile
                imgurl={props.imgurl}
                name={props.name}
                date={props.date}
            />
            {props.children}
        </div>
    )
}
