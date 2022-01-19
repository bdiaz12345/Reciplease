import * as Yup from 'yup';

export const forgotPasswordSchema = Yup.object().shape({
    email:
        Yup 
            .string()
            .email("Please enter a valid email address")
            .required("Email is required")
})

export const resetPasswordSchema = Yup.object().shape({
    password: 
        Yup
            .string()
            .required("Password is required")
            .min(6, "Your password must be at least six characters long")
})