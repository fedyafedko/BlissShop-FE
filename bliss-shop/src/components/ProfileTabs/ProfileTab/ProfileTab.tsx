import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BusinessIcon from '@mui/icons-material/Business';
const ProfileTab = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        width: '800px',
        height: '500px',
        margin: '10px 230px',
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
        <Avatar src="" sx={{ width: '120px', height: '120px' }} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>John Due</Typography>
          <Typography variant="h6">vladfedko35@gmail.com</Typography>
          <Button variant="contained" sx={{
            backgroundColor: 'secondary.main',
            color: 'primary.dark',
            width: '110px',
            borderRadius: '0px',
            ":hover": {
              backgroundColor: 'secondary.main'
            }
          }}>Edit</Button>
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
            justifyContent: 'center',
            gap: '150px'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><EmailIcon />Email</Typography>
              <Typography sx={{ fontSize: '17px' }}>vladfedko32@gmail.com</Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><PhoneAndroidIcon />Phone</Typography>
              <Typography sx={{ fontSize: '17px' }}>+380932123894</Typography>
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
            <Typography variant="h6">Information</Typography>
            <Divider />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '150px'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><EmailIcon />Email</Typography>
              <Typography sx={{ fontSize: '17px' }}>vladfedko32@gmail.com</Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><PhoneAndroidIcon />Phone</Typography>
              <Typography sx={{ fontSize: '17px' }}>+380932123894</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileTab;