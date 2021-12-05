import React, { useState, useEffect } from 'react';
// import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
// import loginSchema from '../formSchema/loginSchema';
import axios from 'axios';
// import Input from '@mui/material/Input';
// import { ButtonUnstyled } from '@mui/material';

const formErrors = {
    email: '',
    password: ''
}

function LogIn() {
    const [loginValues, setLoginValues] = useState({});
    // const [loginErrors, setLoginErrors] = useState(formErrors);

    useEffect(() => {
        setLoginValues({
            email: '',
            password: ''
        })
        return () => {
            setLoginValues({})
        }
    }, [])

    const history = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('https://reciplease-backend.vercel.app/users/login', loginValues)
            .then(res => {
                console.log('congratulations you fuck, welcum to our website af', res)
                history('/search');
            })
            .catch(err => {console.log(err)})
    }

    // const handleFormErrors = (name, value) => {
    //     Yup.reach(loginSchema,name).validate(value)
    //         .then(valid => {
    //             setLoginErrors({...loginErrors, [name]: ''})
    //         })
    //         .catch(err => {
    //             setLoginErrors({...loginErrors, [name]: err.errors[0]})
    //         })
    // }

    const handleChange = (e) => {
        setLoginValues({...loginValues, [e.target.name]: e.target.value})
    }
    
    return (
        <div className="login-screen">
            <div className="login-wrapper">
                <h1>Login</h1>
                <p>Welcome back! Lettuce show you some more<br/> recipes to fall in love with!</p>
                {formErrors.email && <p>{formErrors.email}</p>}
                {formErrors.password && <p>{formErrors.password}</p>}
                <form onSubmit={onSubmit}>
                    <input
                        id="login-input"
                        type='text'
                        name='email'
                        placeholder='  Email'
                        onChange={handleChange}
                    />
                    <input
                        id="login-input"
                        type='password'
                        name='password'
                        placeholder='  Password'
                        onChange={handleChange}
                    />
                    {/* <ButtonUnstyled type='submit'>Let's get cook'n</ButtonUnstyled> */}
                    <button type="submit" className="cookin-button-login">Let's get cook'n</button>
                    <p className='options'>
                        <Link to='/signup'>Sign Up</Link> or <Link to='/'>Learn More</Link>
                    </p>
                </form>
            </div>
            
        </div>
    )
}

export default LogIn
