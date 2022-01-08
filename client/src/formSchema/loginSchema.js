import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('You Must Use a Valid Email Address')
        .required('Email is a Required Field'),
    password: Yup
        .string()
        .required('Password Is Required')
        .min(6, 'Your Password Needs to At Least Be 6 Characters Long')
})

export default loginSchema;