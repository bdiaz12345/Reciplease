import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import schema from '../formSchema/forgotPasswordSchema';

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
        schema.isValid(inputValue)
        .then(valid => {
            setDisabledBtn(!valid)
        })
    }, [inputValue])

    const inputErrorHandler = ((name, value) => {
        yup
            .reach(schema, name)
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

        console.log('handler initiated', inputValue)

        setInputValue(initialValue)
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
                        value={inputValue.email}
                        onChange={inputChangeListener}
                    />
                    {formError.email && <p className="forgot-validation-error">{formError.email}</p>}
                    <button type="submit" disabled={disabledBtn} className="forgot-btn">Verify</button>
                </form>
                <Link to="/login" className='return-login'>Return to Login</Link>
                <p>Don't have an account? <Link to='/signup' className='return-login'>Create one here</Link></p>
            </div>
        </div>
    )
}

export default ForgotPassword
