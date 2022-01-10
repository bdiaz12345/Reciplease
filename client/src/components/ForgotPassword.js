import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/forgot.scss'

function ForgotPassword() {
    const [disableBtn, setDisabledBtn] = useState(true)

    const enableBtn = () => {
        setDisabledBtn(!disableBtn)
    }
    return (
        <div className="forgot-screen">
            <div className="forgot-wrapper">
                <h1>Forgot Password</h1>
                <p>Please provide your email address below so we can verify your account</p>

                <form>
                    <input 
                        type='text'
                        name='email'
                        placeholder="Email"
                        className="forgot-input"
                    />
                    <button type="submit" className="forgot-btn">Verify</button>
                </form>
                <Link to="/login" className='return-login'>Return to Login</Link>
            </div>
        </div>
    )
}

export default ForgotPassword
