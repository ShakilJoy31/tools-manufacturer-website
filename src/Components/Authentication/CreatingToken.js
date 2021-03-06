import React from 'react';

const CreatingToken = (user, name) => {
    const userEmail = user?.email;
    const userName = name;
    fetch(`https://guarded-badlands-57795.herokuapp.com/adduser/${userEmail}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ userName, userEmail })
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('accessToken', data?.token)
        })
};

export default CreatingToken;