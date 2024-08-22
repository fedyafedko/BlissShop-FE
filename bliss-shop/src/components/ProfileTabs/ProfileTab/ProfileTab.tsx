import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from "react";
import User from "../../../api/User";
import UserResponse from "../../../api/models/response/UserResponse";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

const ProfileTab = () => {
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    const me = async () => {
      const response = await User.me();
      setUser(response.data);
    };

    me();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        height: '500px',
        boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '270px',
        height: '100%',
        background: 'linear-gradient(to left,#6BC791, #276841)',
        gap: '80px',
      }}>
        <Avatar src={`${IMAGES_URL}${user?.urlAvatar}`} sx={{ width: '120px', height: '120px' }} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{user?.fullName}</Typography>
          <Typography variant="h6">{user?.email}</Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '530px',
        gap: '50px'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '15px',
          gap: '30px'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h6">Information</Typography>
            <Divider />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0 20px',
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><PersonIcon />Full Name</Typography>
              <Typography sx={{ fontSize: '17px' }}>{user?.fullName}</Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><TheaterComedyIcon />Role</Typography>
              <Typography sx={{ fontSize: '17px' }}>{user?.role}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '15px',
          gap: '30px'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h6">Contacts</Typography>
            <Divider />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0 20px',
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><EmailIcon />Email</Typography>
              <Typography sx={{ fontSize: '17px' }}>{user?.email}</Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><PhoneAndroidIcon />Phone</Typography>
              <Typography sx={{ fontSize: '17px' }}>{user?.phoneNumber}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileTab;