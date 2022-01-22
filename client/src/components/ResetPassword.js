import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { resetPasswordSchema } from '../formSchema/forgotPasswordSchema'

const initialValue = {
    password: ""
}

function ResetPassword(state) {
    const [inputValue, setInputValue] = useState(initialValue)
    const [inputError, setInputError] = useState(initialValue)
    const [disabledBtn, setDisabledBtn] = useState(true)

    const token = window.location.pathname.slice(7)

    const history = useNavigate();

    useEffect(() => {
        resetPasswordSchema.isValid(inputValue)
        .then(valid => {
            setDisabledBtn(!valid)
        })
    }, [inputValue])

    const handleFormErrors = (name, value) => {
        Yup.reach(resetPasswordSchema,name).validate(value)
            .then(valid => {
                setInputError({...inputError, [name]: ''})
            })
            .catch(err => {
                setInputError({...inputError, [name]: err.errors[0]})
            })
    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target

        handleFormErrors(name, value)
        
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put('https://reciplease-backend.vercel.app/users/reset-password', {password: inputValue.password, token: token})
            .then(() => {
                console.log('congrats, you successfully changed your password!')
                history('/login');
            })
            .catch((err) => {console.log(err)})
    }
    
    return (
        <div className="forgot-screen">
            <div className="forgot-wrapper">
                
                    <h1>Reset Password</h1>
                    <p>Please provide your new password.</p>

                    <form onSubmit={submitHandler}>
                        <input 
                            type='password'
                            name='password'
                            placeholder="password"
                            className="forgot-input"
                            value={inputValue.password}
                            onChange={inputChangeHandler}
                        />
                        {inputError.password && <p className="forgot-validation-error">{inputError.password}</p>}
                        <button disabled={disabledBtn} type="submit" className="forgot-btn">Verify</button>
                    </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ResetPassword);
