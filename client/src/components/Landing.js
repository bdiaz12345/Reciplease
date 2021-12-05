import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const history = useNavigate();

    const onSubmit = () => {
        history('/login');
    }
    
    return (
        <div className="content">
            <h1 className="landing-title">Reciplease</h1>
            <p className="landing-description">Don't know what to cook next?</p>
            <button onClick={onSubmit} id="cook-button">Let's get cook'n</button>
        </div>
    )
}

export default Landing