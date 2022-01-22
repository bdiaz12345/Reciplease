import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { CheckOutlined } from '@ant-design/icons';
import axios from 'axios';

import {forgotPasswordSchema} from '../formSchema/forgotPasswordSchema';

import '../styles/forgot.scss'

const initialValue = {
    email: "",
}



function ForgotPassword() {
    const [inputValue, setInputValue] = useState(initialValue);
    const [formError, setFormError] = useState(initialValue);
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        forgotPasswordSchema.isValid(inputValue)
        .then(valid => {
            setDisabledBtn(!valid)
        })
    }, [inputValue])

    const inputErrorHandler = ((name, value) => {
        yup
            .reach(forgotPasswordSchema, name)
            .validate(value)
            .then(() => {
                setFormError({
                    ...formError,
                    [name]: "",
                })
            })
            .catch(err => {
                setFormError({
                    ...formError,
                    [name]: err.errors[0]
                })
            })

    })

    const inputChangeListener = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value})
        inputErrorHandler(e.target.name, e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('https://reciplease-backend.vercel.app/users/forgot-password', {email: inputValue.email.toLowerCase()})
            .then(() => {
                setEmailSent(true)
            })
            .catch(err => console.log({err}))
            .finally(() => setInputValue(initialValue))
    }

    return (
        <div className="forgot-screen">
            <div className="forgot-wrapper">
                { !emailSent ? ( 
                <>
                    <h1>Forgot Password</h1>
                    <p>Please provide your email address below so we can verify your account</p>

                    <form onSubmit={submitHandler}>
                        <input 
                            type='text'
                            name='email'
                            placeholder="Email"
                            className="forgot-input"
                            value={inputValue.email}
                            onChange={inputChangeListener}
                        />
                        {formError.email && <p className="forgot-validation-error">{formError.email}</p>}
                        <button type="submit" disabled={disabledBtn} className="forgot-btn">Verify</button>
                    </form>
                    <Link to="/login" className='return-login'>Return to Login</Link>
                    <p>Don't have an account? <Link to='/signup' className='return-login'>Create one here</Link></p>
                </>
                )
                : 
                    <div className='email-sent'>
                        <CheckOutlined />
                        <h1>Check Your Email</h1>
                        <p>Please check the email address associated with your account for instructions to reset your password.</p>
                    </div>  
                }
            </div>
        </div>
    )
}

export default ForgotPassword
