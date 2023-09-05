import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarWarsPeople = () => {
    const [firstPerson, setFirstPerson] = useState('');

    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
            .then(response => {
                const firstPersonName = response.data.results[0].name;
                setFirstPerson(firstPersonName);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>{firstPerson}</h1>
        </div>
    );
};

export default StarWarsPeople;
