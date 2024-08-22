import * as yup from 'yup';
import { AddAddress } from '../components/ProfileTabs/SettingsTab/SettingsTab';

const addAddressValidation = yup.object<AddAddress>().shape({
    country: yup.string()
        .required('Country is required'),
    city: yup.string()
        .required('City is required'),
    street: yup.string()
        .required('Street is required'),
    zipCode: yup.string()
    .required('Zip code is required')
});

export default addAddressValidation;