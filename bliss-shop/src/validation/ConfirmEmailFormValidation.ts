import * as yup from 'yup';
import { ConfirmEmail } from '../components/ConfirmEmailForm/ConfirmEmailForm';

const confirmEmailValidation = yup.object<ConfirmEmail>().shape({
    code: yup.number()
        .typeError('Code must be a number')
        .required('Code is required')
        .test('len', 'Code must be exactly 6 digits', (val) => {
            return val !== undefined && val.toString().length === 6;
        }),});

export default confirmEmailValidation;