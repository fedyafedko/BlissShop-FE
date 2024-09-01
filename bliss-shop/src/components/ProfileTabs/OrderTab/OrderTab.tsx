import { Box, Typography } from "@mui/material";
import OrdersContainer from "../../OrdersContainer/OrdersContainer";

const OrderTab = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            marginLeft: '-5%',
            gap: '10px',
        }}>
            <Typography variant="h5" sx={{ color: 'secondary.main' }}>My Orders</Typography>
            <OrdersContainer />
        </Box>
    );
};

export default OrderTab;