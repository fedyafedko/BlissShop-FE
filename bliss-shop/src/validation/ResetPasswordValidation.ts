import * as yup from 'yup';
import { ResetPassword } from '../components/ResetPasswordForm/ResetPasswordForm';


const resetPasswordValidation = yup.object<ResetPassword>().shape({
    newPassword: yup.string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[@$!%*#?&\\.,:;]/, 'Password must contain at least one special character')
    .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string()
        .required('Password is required')
        .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export default resetPasswordValidation;