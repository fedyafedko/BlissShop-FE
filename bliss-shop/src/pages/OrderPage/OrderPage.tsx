import { Box, Button, Divider, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, styled, Typography } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import productImage from '../../img/productImage.png';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OrderResponse from "../../api/models/response/OrderResponse";
import { useEffect, useState } from "react";
import Order from "../../api/Order";
import { useParams } from "react-router-dom";
import { Handshake } from "@mui/icons-material";

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'green',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'green',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const OrderPage = () => {
    const params = useParams();
    const [order, setOrder] = useState<OrderResponse>();
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { label: 'Pending', icon: <AccessTimeIcon /> },
        { label: 'Processing', icon: <LocalShippingIcon /> },
        { label: 'Completed', icon: <DoneIcon /> },
    ];

    // Mapping order statuses to step indices
    const statusToStepIndex = {
        "Pending": 0,
        "Processing": 1,
        "Completed": 2,
    };

    useEffect(() => {
        const getOrder = async () => {
            const response = await Order.getById(params.orderId ?? '');
            if (response.success && response.data) {
                setOrder(response.data);

                if (response.data?.status == 'Refund') {
                    setActiveStep(4);
                }
                else {
                    const stepIndex: number = statusToStepIndex[response.data?.status as keyof typeof statusToStepIndex] ?? 0;
                    setActiveStep(stepIndex);
                }
            }
        };
        getOrder();
    }, [params.orderId]);

    const handleRefund = async () => {
        const response = await Order.refund(params.orderId ?? '');
        if (response.success) {
            setActiveStep(4);
        }
    }

    return (
        <Box>
            <Header />
            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    width: '85%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    gap: '20px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Stepper
                            alternativeLabel
                            activeStep={activeStep}
                            connector={<QontoConnector />}
                            sx={{ width: '400px' }}
                        >
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepLabel StepIconComponent={() => step.icon}>
                                    </StepLabel>
                                </Step>
                            ))}
                            {activeStep === 4 && (
                                <Step key={4}>
                                    <StepLabel StepIconComponent={() => <CarCrashIcon />}>
                                    </StepLabel>
                                </Step>
                            )}
                        </Stepper>
                        <Button sx={{
                            alignSelf: 'flex-end',
                            width: '120px',
                            height: '50px',
                            backgroundColor: '#FFE81E',
                            textTransform: 'none',
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            borderRadius: '10px',
                            ":hover": {
                                backgroundColor: '#FFD600',
                            }
                        }}>
                            Refund
                        </Button>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        height: '400px',
                        gap: '20px',
                    }}>
                        <Box sx={{
                            width: '30%',
                            height: '90%',
                            backgroundImage: `url(${order!.product.imagesPath.length > 0 ? `${IMAGES_URL + order!.product.imagesPath[0]}` : productImage})`,
                            objectFit: 'cover',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{order?.product.name}</Typography>
                            <Typography variant="h6">${order?.product.price}</Typography>
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
                                <Typography variant="body1">{order?.product.description}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: '10px',
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Order Details</Typography>
                        <Divider />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            gap: '20px',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}>
                                <Typography variant="h6">Order ID</Typography>
                                <Typography variant="h6">Order Date</Typography>
                                <Typography variant="h6">Order Status</Typography>
                                <Typography variant="h6">Paid</Typography>
                                <Typography variant="h6">Shipping Address</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}>
                                <Typography variant="h6">{order?.id}</Typography>
                                <Typography variant="h6">{order?.createAt.toString()}</Typography>
                                <Typography variant="h6">{order?.status}</Typography>
                                <Typography variant="h6">{order?.isPaid ? 'Yes' : 'No'}</Typography>
                                <Typography variant="h6">{order?.address.country}, {order?.address.city}, {order?.address.street}, {order?.address.zipCode}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default OrderPage;
