import React, {useState} from 'react';

export default function Title(){
    const title = useState('Check every NBA stat you can imagine!');

    return(
        <h5 className="header col s12 light">{title}</h5>
    );
}