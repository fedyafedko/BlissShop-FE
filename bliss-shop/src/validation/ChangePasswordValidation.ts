import * as yup from 'yup';
import { ChangePassword } from '../components/ProfileTabs/SettingsTab/SettingsTab';

const changePasswordValidation = yup.object<ChangePassword>().shape({
    oldPassword: yup.string()
        .required('Current password is required')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one digit')
        .matches(/[@$!%*#?&\\.,:;]/, 'Password must contain at least one special character')
        .min(8, 'Password must be at least 8 characters'),
    newPassword: yup.string()
        .required('New password is required')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one digit')
        .matches(/[@$!%*#?&\\.,:;]/, 'Password must contain at least one special character')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password')
});

export default changePasswordValidation;