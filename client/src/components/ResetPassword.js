import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { resetPasswordSchema } from '../formSchema/forgotPasswordSchema'

const initialValue = {
    password: ""
}

function ResetPassword() {
    const [inputValue, setInputValue] = useState(initialValue)
    const [inputError, setInputError] = useState(initialValue)
    const [disabledBtn, setDisabledBtn] = useState(true)

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
        console.log("successful submission")
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

export default ResetPassword
