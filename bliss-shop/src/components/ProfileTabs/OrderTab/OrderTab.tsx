import { Box, Typography } from "@mui/material";
import OrdersContainer from "../../OrdersContainer/OrdersContainer";

const OrderTab = () => {
    return (
        <Box sx={{
            width: '100%',
            marginLeft: '-5%',
        }}>
            <Typography variant="h5">My Orders</Typography>
            <OrdersContainer />
        </Box>
    );
};

export default OrderTab;