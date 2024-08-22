import * as yup from 'yup';
import { EditProfile } from '../components/ProfileTabs/SettingsTab/SettingsTab';

const editProfileValidation = yup.object<EditProfile>().shape({
    fullName: yup.string()
        .required('Full name is required'),
    phoneNumber: yup.string()
        .required('Phone number is required')
        .matches(
            /^(\+?[1-9]\d{0,2})?[-.\s]?(\(?\d{3}\)?)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
            'Phone number must be a valid format'
        )
});

export default editProfileValidation;