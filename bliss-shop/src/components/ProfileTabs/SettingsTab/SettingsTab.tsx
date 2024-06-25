import { Avatar, Box, Button, Divider, IconButton, Switch, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";

const SettingsTab = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
                width: '100%'
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}>
                <Typography variant="h5" sx={{ width: '80%', textAlign: 'start' }}>Public profile</Typography>
                <Divider sx={{
                    width: '80%',
                    backgroundColor: 'primary.main'
                }} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '100px',
                margin: '20px'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    gap: '20px'
                }}>
                    <TextField color='secondary' label='Full Name' />
                    <TextField color='secondary' label='Phone' />
                    <Button sx={{
                        backgroundColor: 'secondary.main',
                        ":hover": {
                            backgroundColor: 'secondary.main',
                        }
                    }}>Edit</Button>
                </Box>
                <Avatar sx={{
                    width: '170px',
                    height: '170px'
                }}>M</Avatar>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}>
                <Typography variant="h5" sx={{ width: '80%', textAlign: 'start' }}>Change Password</Typography>
                <Divider sx={{
                    width: '80%',
                    backgroundColor: 'primary.main'
                }} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                width: '100%'
            }}>
                <TextField color='secondary' label='Current Password' sx={{width: '300px'}}/>
                <TextField color='secondary' label='New Password' sx={{width: '300px'}}/>
                <TextField color='secondary' label='Confirm Password' sx={{width: '300px'}}/>
                <Button sx={{
                    width: '300px',
                    backgroundColor: 'secondary.main',
                    ":hover": {
                        backgroundColor: 'secondary.main',
                    }
                }}>Change Password</Button>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}>
                <Typography variant="h5" sx={{ width: '80%', textAlign: 'start' }}>Add Address</Typography>
                <Divider sx={{
                    width: '80%',
                    backgroundColor: 'primary.main'
                }} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
            }}>
                <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'flex-end',
            width: '100%',
            padding: '5px',
            maxHeight: '350px',
            overflowY: 'auto',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '450px',
                backgroundColor: 'primary.main',
                alignItems: 'center',
                height: '100px',
                alignText: 'start',
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                justifyContent: 'space-between'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                }}>
                    <Typography variant="body1" sx={{ width: '100%' }}>Country: USA</Typography>
                    <Typography variant="body1" sx={{ width: '100%' }}>City: New York</Typography>
                    <Typography variant="body1" sx={{ width: '100%' }}>Street: 5th Avenue</Typography>
                    <Typography variant="body1" sx={{ width: '100%' }}>Zip Code: 10001</Typography>
                </Box>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    width: '100%'
                }}>
                    <TextField color='secondary' label='Country'  sx={{width: '300px'}}/>
                    <TextField color='secondary' label='City' sx={{width: '300px'}}/>
                    <TextField color='secondary' label='Street' sx={{width: '300px'}}/>
                    <TextField color='secondary' label='Zip Code' sx={{width: '300px'}}/>
                    <Button sx={{
                        width: '300px',
                        backgroundColor: 'secondary.main',
                        ":hover": {
                            backgroundColor: 'secondary.main',
                        }
                    }}>Add Address</Button>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}>
                <Typography variant="h5" sx={{ width: '80%', textAlign: 'start' }}>Customize</Typography>
                <Divider sx={{
                    width: '80%',
                    backgroundColor: 'primary.main'
                }} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '80%',
                    gap: '20px'
                    }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '20px',
                        width: '60%',
                        padding: '20px',
                        borderRadius: '20px',
                        border: '1px solid black',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant="body1">Theme</Typography>
                        <ThemeSwitch />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '20px',
                        width: '60%',
                        padding: '20px',
                        borderRadius: '20px',
                        border: '1px solid black',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant="body1">Send Notifications</Typography>
                        <Switch defaultChecked color="secondary" />
                    </Box>
                </Box>
        </Box>
    );
};

export default SettingsTab;