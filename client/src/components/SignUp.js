import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import schema from '../formSchema/signSchema';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import { Loading3QuartersOutlined } from '@ant-design/icons'

import "../styles/signup.scss";
import { getUser } from '../actions';
import { useDispatch } from 'react-redux';



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

    const dispatch = useDispatch();
    
    const push = useNavigate();

    const handleFormErrors = ((name, value) => {
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
    })

    const handleInputChange = (e => {
        handleFormErrors(e.target.name, e.target.value);
        setFormValues({...formValues, [e.target.name]: e.target.value})
    })

    useEffect(() => {
        schema.isValid(formValues)
            .then(valid => {
                setDisabledBtn(!valid)
            })
    }, [formValues])


    const handleSubmit = (e) => {
        e.preventDefault();

        setSignUpSuccess({
            message: <Loading3QuartersOutlined spin style={loadingIconStyle} />,
            activeClass: signUpSuccess.activeClass
        })
        
        axios.post('https://reciplease-backend.vercel.app/users/register', formValues)
            .then((res) => {
                setSignUpSuccess({
                    message: "Success!",
                    activeClass:"success-modal"
                })
                dispatch(getUser({username: formValues.username, email: formValues.email}));
                localStorage.setItem('user', JSON.stringify({username: formValues.username, email: formValues.email}))
                localStorage.setItem("token", JSON.stringify(res.data.token))
                setTimeout(() => {
                    push("/search")
                }, 1500)
            })
            .catch(err => {
                setSignUpSuccess({
                    message: err.response.data.message,
                    activeClass: "error-modal"
                })

                console.log({err})
            })
            .finally(() => {
                setFormValues(initialValues)
            })
    }

    const loadingIconStyle = {
        fontSize: '3rem',
        width: '100%'
    }


    return (
        <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <p>Sign up today and begin searching for your favorite recipes right away!</p>

                    { signUpSuccess ? <p className={signUpSuccess.activeClass}>{signUpSuccess.message}</p> : null}

                    { formErrors.username && 
                        <p className="errors">{formErrors.username}</p> }
                    <input
                        className="signup-input"
                        variant="outlined"
                        name='username'
                        type='text'
                        value={formValues.username}
                        onChange={handleInputChange}
                        placeholder='Username'
                        />

                    { formErrors.email && 
                        <p className="errors">{formErrors.email}</p> }
                    <input
                        className="signup-input"
                        name='email'
                        type='email'
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder='Email'
                    />

                    { formErrors.password && 
                        <p className="errors">{formErrors.password}</p> }
                    <input
                        className="signup-input"
                        name='password'
                        type='password'
                        value={formValues.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                    />
                        
                        <button disabled={disabledBtn} type="submit" className="signup-btn">Let's get cook'n</button>

                    <p className='options'>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>
    )
}

export default SignUp