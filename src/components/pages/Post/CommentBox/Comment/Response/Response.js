import React from 'react';
import { UserTile, Avatar } from '../../../../../reusable/PostTile/PostTile';
import DateStamp, { month } from '../../../../../reusable/dates/dates';

export default function Response(props) {
    let date = new Date(props.date)
    return (
        <div className='Response'>
            <Avatar name={props.name} />
            {/* <div className='avatar'>
                {props.name ? props.name.slice(0, 2).toUpperCase() : null}
            </div> */}
            <div className='response'>
                <div className='response-header'>
                    <div className='name'>
                        {props.name}
                    </div>
                    <DateStamp date={date} />
                </div>
                <div className='response-body'>
                    {`"${props.body}"`}
                </div>
            </div>
        </div>
        // <div className='Response'>
        //     <UserTile
        //         imgurl={props.imgurl}
        //         name={props.name}
        //         date={props.date}
        //     />
        //     {props.children}
        // </div>
    )
}
