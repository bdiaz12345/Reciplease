import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/forgot.scss'

function ForgotPassword() {
    const [inputValue, setInputValue] = useState("");

    const inputChangeListener = (e) => {
        setInputValue(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        console.log('handler initiated', inputValue)
    }

    return (
        <div className="forgot-screen">
            <div className="forgot-wrapper">
                <h1>Forgot Password</h1>
                <p>Please provide your email address below so we can verify your account</p>

                <form onSubmit={submitHandler}>
                    <input 
                        type='text'
                        name='email'
                        placeholder="Email"
                        className="forgot-input"
                        value={inputValue}
                        onChange={inputChangeListener}
                    />
                    <button type="submit" className="forgot-btn">Verify</button>
                </form>
                <Link to="/login" className='return-login'>Return to Login</Link>
                <p>Don't have an account? <Link to='/signup' className='return-login'>Create one here</Link></p>
            </div>
        </div>
    )
}

export default ForgotPassword
