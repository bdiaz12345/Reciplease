import * as Yup from 'yup';

const signSchema = Yup.object().shape({
    username: Yup
        .string()
        .required('username Is Required')
        .min(2, 'Your username Needs to At Least Be 2 Characters Long'),
    email: Yup
        .string()
        .email('You Must Use a Valid Email Address')
        .required('Email is a Required Field'),
    password: Yup
        .string()
        .required('Password Is Required')
        .min(6, 'Your Password Needs to At Least Be 6 Characters Long')
})

export default signSchema;