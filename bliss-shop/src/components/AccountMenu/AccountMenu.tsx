import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import { Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon, Button, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer } from "@mui/material";
import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const [state, setState] = React.useState({
    right: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ right: open });
  };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        gap: '30px'
      }}>
        <Box
        onClick={() => navigate('/profile/1')}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '7px',
          width: '260px',
          backgroundColor: 'primary.light',
          borderRadius: '30px',
          cursor: 'pointer'
        }}>

          <Avatar sx={{ width: 33, height: 33 }} />
          <Typography variant="h6" color='primary.main'>John Doe</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          
        }}>
          <Box>
            <Button
              variant="text"
              sx={{
                textTransform: 'none',
                fontSize: '20px',
                color: 'secondary.dark'
              }}
              startIcon={<CategoryIcon sx={{ marginRight: '10px', width: '30px', height: '30px' }} />}>

              Category
            </Button>
            <Button
              variant="text"
              sx={{
                textTransform: 'none',
                fontSize: '20px',
                color: 'secondary.dark'
              }}
              startIcon={<RestaurantMenuIcon sx={{ marginRight: '10px', width: '30px', height: '30px' }} />}>

              My Orders
            </Button>
            <Button
              variant="text"
              sx={{
                textTransform: 'none',
                fontSize: '20px',
                color: 'secondary.dark'
              }}
              startIcon={<SubscriptionsIcon sx={{ marginRight: '10px', width: '30px', height: '30px' }} />}>

              My Subscriptions
            </Button>
          </Box>
          <Box sx={{
            marginTop: '350px'
          }}>
            <Divider/>
          <Button
              variant="text"
              sx={{
                textTransform: 'none',
                fontSize: '20px',
                color: 'secondary.dark'
              }}
              startIcon={<Settings sx={{ marginRight: '10px', width: '30px', height: '30px' }} />}>

              Settings
            </Button>
            <Button
              variant="text"
              sx={{
                textTransform: 'none',
                fontSize: '20px',
                color: 'secondary.dark'
              }}
              startIcon={<Logout sx={{ marginRight: '10px', width: '30px', height: '30px' }} />}>

              Sign Out
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton aria-label="delete" size="large" onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
};

export default AccountMenu;
