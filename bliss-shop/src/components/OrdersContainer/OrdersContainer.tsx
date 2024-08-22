import { Box, Card, Typography } from '@mui/material';
import productImage from '../../img/productImage.png';

const OrdersContainer = () => {
  return (
    <Card sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2%',
      width: '1100px',
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
      {[...Array(10)].map((_, index) => (
        <Box key={index} sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '32%',
          height: '150px',
          backgroundColor: 'secondary.main',
          padding: '8px',
        }}>
          <Box sx={{
            width: '120px',
            height: '100%',
            backgroundImage: `url(${productImage})`,
            objectFit: 'cover',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5%',
            padding: '2%',
          }}>
            <Typography variant="h6">Product Name</Typography>
            <Typography variant="body1">Product description</Typography>
            <Typography variant="body1">Total: $100</Typography>

          </Box>
        </Box>
      ))}
    </Card>
  );
}

export default OrdersContainer;
