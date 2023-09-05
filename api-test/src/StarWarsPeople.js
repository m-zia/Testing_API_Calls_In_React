import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarWarsPeople = () => {
    const [firstPerson, setFirstPerson] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
            .then(response => {
                const firstPersonName = response.data.results[0].name;
                setFirstPerson(firstPersonName);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 500) {
                        setErrorMessage("Oops... something went wrong, try again 🤕");
                    } else if (error.response.status === 418) {
                        setErrorMessage("418 I'm a tea pot 🫖, silly");
                    }
                } else {
                    console.log('Error', error.message);
                    setErrorMessage("Oops... something went wrong, try again 🤕");
                }
            });
    }, []);

    return (
        <div>
            {errorMessage ? (<h1>{errorMessage}</h1>) : (<h1>{firstPerson}</h1>)}
        </div>
    );
};

export default StarWarsPeople;
