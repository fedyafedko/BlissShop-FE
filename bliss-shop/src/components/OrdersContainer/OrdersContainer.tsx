import { Box, Card, Typography } from '@mui/material';
import productImage from '../../img/productImage.png';
import { useEffect, useState } from 'react';
import Order from '../../api/Order';
import OrderResponse from '../../api/models/response/OrderResponse';
import { useNavigate } from 'react-router-dom';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const OrdersContainer = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getOrders = async () => {
      const response = await Order.getForUser();
      if (response.success && response.data) {
        setOrders(response.data);
      }
    };
    getOrders();
  }, []);

  return (
    <Card sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2%',
      width: '1090px',
      alignItems: 'start',
      height: '530px',
      borderRadius: '15px',
      backgroundColor: 'primary.main',
      padding: '2%',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
    }}>
      {orders.map((order, index) => (
        <Box key={index}
        onClick={() => navigate(`order/${order.id}`)}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '32%',
          height: '150px',
          backgroundColor: 'secondary.main',
          padding: '8px',
          ":hover": {
            cursor: 'pointer',
          }
        }}>
          <Box sx={{
            width: '120px',
            height: '100%',
            backgroundImage: `url(${order.product.imagesPath.length > 0 ? `${IMAGES_URL + order.product.imagesPath[0]}` : productImage})`,
            objectFit: 'cover',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            gap: '5%',
            padding: '2%',
          }}>
            <Typography variant="h6" sx={{
              color: 'primary.main',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{order.product.name}</Typography>
            <Typography variant="body1" sx={{
              color: 'primary.main',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{order.product.description}</Typography>
            <Typography sx={{ color: 'primary.main', textAlign: 'end', fontSize: '20px', fontWeight: 'bold'}}>${order.product.price}</Typography>
            <Typography sx={{ color: 'primary.main', fontSize: '10px', textAlign: 'end' }}>Quantity: {order.quantity}</Typography>
          </Box>
        </Box>
      ))}
    </Card>
  );
}

export default OrdersContainer;
