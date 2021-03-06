import React, { useState, useEffect } from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import loginSchema from '../formSchema/loginSchema';
import { getUser } from '../actions';


const initialValues = {
    email: '',
    password: ''
}

function LogIn() {
    const [loginValues, setLoginValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [disables, setDisabled] = useState(true);
    const [signUpSuccess, setSignUpSuccess] = useState({
        message: "",
        activeClass: ""
    })

    const history = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        loginSchema.isValid(loginValues)
        .then((valid) => {
            setDisabled(!valid)
        })
    }, [loginValues])

    const handleFormErrors = (name, value) => {
        Yup.reach(loginSchema,name).validate(value)
            .then(valid => {
                setFormErrors({...formErrors, [name]: ''})
            })
            .catch(err => {
                setFormErrors({...formErrors, [name]: err.errors[0]})
            })
    }

    
    const handleChange = (e) => {
        handleFormErrors(e.target.name, e.target.value)
        setLoginValues({...loginValues, [e.target.name]: e.target.value})
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        setSignUpSuccess({
            message: <Loading3QuartersOutlined spin style={loadingIconStyle} />,
            activeClass: signUpSuccess.activeClass
        })

        axios.post('https://reciplease-backend.vercel.app/users/login', {email: loginValues.email.toLowerCase(), password: loginValues.password})
            .then(res => {
                setSignUpSuccess({
                    message: "Login Successful!",
                    activeClass: "success-modal"
                })

                dispatch(getUser({username: res.data.username, email: loginValues.email}));
                localStorage.setItem('user', JSON.stringify({username: res.data.username, email: loginValues.email.toLowerCase()}))
                localStorage.setItem('token', res.data.token)

                setTimeout(() => {
                    history('/search');
                }, 1500)
            })

            .catch(err => {
                setSignUpSuccess({
                    message: err.response.data.message,
                    activeClass: "error-modal"
                })
            })
    }

    const loadingIconStyle = {
        fontSize: '3rem',
        width: '100%'
    }
    
    return (
        <div className="login-screen">
            <div className="login-wrapper">
                <h1>Login</h1>
                <p>Welcome back! Lettuce show you some more recipes to fall in love with!</p>
                {formErrors.email && <p className='errors'>{formErrors.email}</p>}
                {formErrors.password && <p className='errors'>{formErrors.password}</p>}

                {signUpSuccess && <p className={signUpSuccess.activeClass}>{signUpSuccess.message}</p>}
                <form onSubmit={onSubmit}>
                    <input
                        className="login-input"
                        type='text'
                        name='email'
                        placeholder='Email'
                        onChange={handleChange}
                    />
                    <input
                        className="login-input"
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                    />
                    <button disabled={disables} className="login-btn">Let's get cook'n</button>
                    <p className='options'>
                        Don't have an account? <Link to='/signup' className='options-link'>Sign up here</Link> <br />
                        <Link to='/forgot' className='options-link'>Forgot password?</Link>
                    </p>
                </form>
            </div>
            
        </div>
    )
}


const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, {getUser})(LogIn)
