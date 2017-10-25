import React from 'react';
import './date.css';

export function month(num) {
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

export default function DateStamp(props) {
    if (props) {
        if (props.date) {
            let date = new Date(props.date)
            console.log(typeof date)
            return (
                <div className='DateStamp'>
                    <div className='short-date'>
                        {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
                    </div>
                    <div className='full-date'>
                        {`${month(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`}
                    </div>
                </div>
            )
        }
        else return null
    }
    else return null
}
