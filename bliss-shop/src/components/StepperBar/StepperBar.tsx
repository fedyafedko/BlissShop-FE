import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Stack, StepConnector, StepIconProps, stepConnectorClasses, styled } from '@mui/material';
import { Check } from '@mui/icons-material';
import SignUpForm from '../SignUpForm/SignUpForm';
import ConfirmEmailForm from '../ConfirmEmailForm/ConfirmEmailForm';
import { useState } from 'react';
import FinishAuth from '../FinishAuth/FinishAuth';
import { useNavigate } from 'react-router-dom';
import SignUpRequest from '../../api/models/request/Auth/SignUpRequest';
import SignUpGoogleRequest from '../../api/models/request/Auth/SignUpGoogleRequest';
import Auth from '../../api/Auth';
import ConfirmEmailRequest from '../../api/models/request/Auth/ConfirmEmailRequest';
import useNotification from '../../hooks/useNotification';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.mode === 'dark' ? '#F3F9E3' : '#276841',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.mode === 'dark' ? '#F3F9E3' : '#276841',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: theme.palette.mode === 'dark' ? '#F3F9E3' : '#276841',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: theme.palette.mode === 'dark' ? '#F3F9E3' : '#276841',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const steps = ['Sign Up', 'Confirmed Email', 'Finished'];

const StepperBar = () => {
    const initialStep = parseInt(localStorage.getItem('currentStep') || '0');
    const [activeStep, setActiveStep] = useState(initialStep);
    const { notifyError, notifySuccess,  Notification } = useNotification();
    const navigate = useNavigate();

    React.useEffect(() => {
        localStorage.setItem('currentStep', activeStep.toString());
      }, [activeStep]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSignUp = async (data: SignUpRequest) => {
        const response = await Auth.signUp(data);
        localStorage.setItem('userId', response.data?.userId ? response.data.userId : '');
        if (response.statusCode === 200) {
            handleNext();
        }
        else {
            notifyError(response.error);
        }
    };
    const handleSignUpGoogle = async (data: SignUpGoogleRequest) => {
        const response = await Auth.signUpGoogle(data);
        if (response === undefined) {
            setActiveStep((prevActiveStep) => prevActiveStep + 2);
        }
        else {
            notifyError(response);
        }
    };
    const handleConfirmEmail = async (code: number) => {
        const data: ConfirmEmailRequest = { code: code, userId: localStorage.getItem('userId') || ' ' };
        const response = await Auth.confirmEmail(data);
        if (response === undefined) {
            handleNext();
        }
        else {
            notifyError(response);
        }
    };
    const handleResetEmailCode = async () => {
        const response = await Auth.resendEmailConfirmationCode(localStorage.getItem('userId') || '');
        if (response === undefined) {
            notifySuccess('Email code has been sent to your email');
        }
        else {
            notifyError(response);
        }
    };
    const handleComplete = () => {
        localStorage.removeItem('currentStep');
        navigate('/');
    };

    return (
        <Box sx={{
            width: '80%', margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                {activeStep === 0 ? (
                    <SignUpForm onSignUpComplete={handleSignUp} onSignUpGoogleComplete={handleSignUpGoogle} />
                ) : activeStep === 1 ? (
                    <ConfirmEmailForm confirmEmail={handleConfirmEmail} resendEmailCode={handleResetEmailCode}/>
                ) : (
                    <FinishAuth onComplete={handleComplete} />
                )}
            </Box>
            <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>
        </Box>
    );
};

export default StepperBar;