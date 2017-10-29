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

function dd(num) {
    if (String(num).length > 1) return num;
    else return ('0' + String(num))
}

export default function DateStamp(props) {
    if (props) {
        if (props.date) {
            let date = new Date(props.date)
            console.log(typeof date)
            return (
                <div className='DateStamp'>
                    <div className='short-date'>
                        {`${dd(date.getMonth() + 1)}/${dd(date.getDate())}/${date.getFullYear()}`}
                    </div>
                    <div className='full-date'>
                        {`${month(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${dd(date.getMinutes())}`}
                    </div>
                </div>
            )
        }
        else return null
    }
    else return null
}
