import { Avatar, Box, Button, Divider, Typography } from "@mui/material";

const ProfileTab = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        width: '700px',
        height: '450px',
        margin: '50px 230px',
        boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '24px',
      }}
    >
      <Avatar
        sx={{
          width: '110px',
          height: '110px',
          backgroundColor: 'secondary.main',
          fontSize: '2rem',
          top: 0,
          transform: 'translateY(-50%)',
        }}
      >
        A
      </Avatar>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '-45px',
      }}>
        <Typography variant="h5" sx={{ color: 'secondary.dark', fontWeight: 'bold' }}>John Due</Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          width: '700px',
          gap: '10px',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '50px',
          }}>
            <Typography variant="h6" sx={{ color: 'secondary.dark', fontWeight: 'bold' }}>Email:</Typography>
            <Typography variant="h6" sx={{ color: 'secondary.dark' }}>vladfedko342@gmail.com</Typography>
          </Box>
          <Divider sx={{ width: '100%', margin: '10px 0' }} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '50px',
          }}>
            <Typography variant="h6" sx={{ color: 'secondary.dark', fontWeight: 'bold' }}>Phone:</Typography>
            <Typography variant="h6" sx={{ color: 'secondary.dark' }}>+380967332123</Typography>
          </Box>
          <Divider sx={{ width: '100%', margin: '10px 0' }} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '50px',
          }}>
            <Typography variant="h6" sx={{ color: 'secondary.dark', fontWeight: 'bold' }}>Address:</Typography>
            <Typography variant="h6" sx={{ color: 'secondary.dark' }}>Konoton 3</Typography>
          </Box>
          <Divider sx={{ width: '100%', margin: '10px 0' }} />
        </Box>
        <Button sx={{
          backgroundColor: 'secondary.main',
          width: '200px',
          height: '40px',
          textTransform: 'none',
          fontSize: '1.2rem',
          ":hover": {
            backgroundColor: 'secondary.main',
          }
        }}>Edit</Button>
      </Box>
    </Box>
  );
};

export default ProfileTab;