import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import schema from '../formSchema/signSchema';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import "../styles/signup.scss";



const initialValues = {
    username: '',
    email: '',
    password: '',
}

function SignUp() {
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialValues)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [signUpSuccess, setSignUpSuccess] = useState({
        message: "",
        activeClass: ""
    })
    
    const push = useNavigate();

    const onChange = (evt) => {
        const { name, value, } = evt.target;
        inputChange(name, value);
    }

    const inputChange = (name, value) => {
        // Handles the form error messages displayed in UI
        yup
            .reach(schema, name)
            .validate(value)
            .then(() => {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                })
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0],
                })
            })

        // tracks the user inputs
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    // useEffect(() => {
    //     schema.isValid(formValues)
    //         .then(valid => {
    //             setDisabledBtn(!valid)
    //         })
    // }, [formValues])


    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('https://reciplease-backend.vercel.app/users/register', formValues)
            .then((res) => {
                setSignUpSuccess({
                    message: "Success!",
                    activeClass:"success-modal"
                })
                localStorage.setItem("token", res.data.token)
                setTimeout(() => {
                    push("/search")
                }, 2000)
            })
            .catch(err => {
                setSignUpSuccess({
                    message: err.message,
                    activeClass: "error-modal"
                })
            })
            .finally(() => {
                setFormValues(initialValues)
            })
    }


    return (
        <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <p>Don’t worry, we aren’t doing anything with your info! Just need you to create an account to save the recipes you love.</p>

                    { signUpSuccess ? <p className={signUpSuccess.activeClass}>{signUpSuccess.message}</p> : null}

                    { formErrors.username && 
                        <p className="errors">{formErrors.username}</p> }
                    <input
                        id="login-input"
                        variant="outlined"
                        name='username'
                        type='text'
                        value={formValues.username}
                        onChange={onChange}
                        placeholder='Username'
                        />

                    { formErrors.email && 
                        <p className="errors">{formErrors.email}</p> }
                    <input
                        id="login-input"
                        name='email'
                        type='email'
                        value={formValues.email}
                        onChange={onChange}
                        placeholder='Email'
                    />

                    { formErrors.password && 
                        <p className="errors">{formErrors.password}</p> }
                    <input
                        id="login-input"
                        name='password'
                        type='password '
                        value={formValues.password}
                        onChange={onChange}
                        placeholder='Password'
                    />
                        
                        <button disabled={disabledBtn} type="submit" className="cookin-button-login">Let's get cook'n</button>

                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>
    )
}

export default SignUp