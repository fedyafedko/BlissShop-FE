import { Avatar, Box, Button, Divider, IconButton, Switch, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from "react";
import User from "../../../api/User";
import PersonIcon from '@mui/icons-material/Person';
import editProfileValidation from "../../../validation/EditProfileValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UpdateProfileRequest from "../../../api/models/request/User/UpdateProfileRequest";
import useNotification from "../../../hooks/useNotification";
import changePasswordValidation from "../../../validation/ChangePasswordValidation";
import ChangePasswordRequest from "../../../api/models/request/Auth/ChangePasswordRequest";
import Address from "../../../api/Address";
import AddressResponse from "../../../api/models/response/AddressResponse";
import addAddressValidation from "../../../validation/AddAddressValidator";
import CreateAddressRequest from "../../../api/models/request/CreateAddressRequest";
import Setting from "../../../api/Setting";
import SettingResponse from "../../../api/models/response/SettingResponse";
import { ProfilePageProps } from "../../../pages/ProfilePage/ProfilePage";

const IMAGES_URL = process.env.REACT_APP_IMAGES_URL;

export interface EditProfile {
    fullName: string;
    phoneNumber: string;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AddAddress {
    country: string;
    city: string;
    street: string;
    zipCode: string;
}

const SettingsTab : React.FC<ProfilePageProps> = ({ handleUpdateSetting, settings }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [addresses, setAddresses] = useState<AddressResponse[]>();
    const [userSettings, setUserSettings] = useState<SettingResponse>();
    //const [user, setUser] = useState<UserResponse>();
    const { notifyError, notifySuccess, Notification } = useNotification();
    const {
        register: registerEditProfile,
        handleSubmit: handleSubmitEditProfile,
        formState: { errors: errorsEditProfile }
    } = useForm<EditProfile>({
        resolver: yupResolver(editProfileValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });
    const {
        register: registerChangePassword,
        handleSubmit: handleSubmitChangePassword,
        formState: { errors: errorsChangePassword }
    } = useForm<ChangePassword>({
        resolver: yupResolver(changePasswordValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });
    const {
        register: registerAddAddress,
        handleSubmit: handleAddAddress,
        formState: { errors: errorsAddAddress }
    } = useForm<AddAddress>({
        resolver: yupResolver(addAddressValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });


    useEffect(() => {
        const me = async () => {
            const response = await User.me();
            if (response.data) {
                setAvatar(`${IMAGES_URL}${response.data.urlAvatar}`);
            }
            //setUser(response.data);
        };
        const getAddresses = async () => {
            const response = await Address.getAllForUser();
            if (response.data) {
                setAddresses(response.data);
            }
        };  
        const getSettings = async () => {
            const response = await Setting.getForUser();
            if (response.data) {
                setUserSettings(response.data);
            }
        };
        me();
        getAddresses();
        getSettings();
    }, []);

    const handleEditProfile = async (data: EditProfile) => {
        var response = await User.editProfile(data as UpdateProfileRequest);
        if (response.success) {
            notifySuccess('Profile updated successfully');
        } else {
            notifyError(response.error.message);
        }
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Selected file:', file);

            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
            var response = await User.uploadAvatar(file);
            console.log(response);
        }
    };

    const handleDeleteAvatar = async () => {
        var response = await User.deleteAvatar();
        if (response.success) {
            setAvatar(null);
        } else {
            notifyError(response.error);
        }
    };

    const handleChangePassword = async (data: ChangePassword) => {
        var response = await User.changePassword(data as ChangePasswordRequest);
        if (response.success) {
            notifySuccess('Password changed successfully');
        } else {
            notifyError(response.error);
        }
    };

    const handleDeleteAddress = async (addressId: string) => {
        const response = await Address.delete(addressId);

        if (response.success) {
            notifySuccess('Address deleted successfully');
            setAddresses(addresses?.filter(address => address.id !== addressId));
        } else {
            notifyError(response.error);
        }
    };

    const handleCreateAddress = async (data: AddAddress) => {
        const response = await Address.add(data as CreateAddressRequest);

        if (response.success) {
            notifySuccess('Address added successfully');
            addresses?.push(response.data!);
        } else {
            notifyError(response.error);
        }
    };
      
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
                <Typography variant="h5" sx={{ width: '100%', textAlign: 'start' }}>Public profile</Typography>
                <Divider sx={{
                    width: '100%',
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
                    <TextField
                        {...registerEditProfile('fullName')}
                        error={!!errorsEditProfile.fullName}
                        helperText={errorsEditProfile.fullName?.message || ' '}
                        color='secondary'
                        label='Full Name' />
                    <TextField
                        {...registerEditProfile('phoneNumber')}
                        error={!!errorsEditProfile.phoneNumber}
                        helperText={errorsEditProfile.phoneNumber?.message || ' '}
                        color='secondary'
                        label='Phone' />
                    <Button sx={{
                        backgroundColor: 'secondary.main',
                        textTransform: 'none',
                        ":hover": {
                            backgroundColor: 'secondary.main',
                        }
                    }}
                        onClick={handleSubmitEditProfile(handleEditProfile)}
                    >Save</Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '30px',
                }}>
                    <Box>
                        <Avatar
                            sx={{
                                width: '170px',
                                height: '170px',
                                cursor: 'pointer',
                            }}
                            onClick={handleAvatarClick}
                            src={avatar || ''}
                        >
                            {!avatar && <PersonIcon sx={{ width: '130px', height: '130px' }} />}
                        </Avatar>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </Box>
                    <Button variant="outlined" color="error" onClick={handleDeleteAvatar}
                        sx={{
                            width: '200px',
                            textTransform: 'none',
                        }}>Delete avatar</Button>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}>
                <Typography variant="h5" sx={{ width: '100%', textAlign: 'start' }}>Change Password</Typography>
                <Divider sx={{
                    width: '100%',
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
                <TextField
                    {...registerChangePassword('oldPassword')}
                    error={!!errorsChangePassword.oldPassword}
                    helperText={errorsChangePassword.oldPassword?.message || ' '}
                    color='secondary'
                    label='Current Password'
                    sx={{ width: '300px' }} />
                <TextField
                    {...registerChangePassword('newPassword')}
                    error={!!errorsChangePassword.newPassword}
                    helperText={errorsChangePassword.newPassword?.message || ' '}
                    color='secondary'
                    label='New Password'
                    sx={{ width: '300px' }} />
                <TextField
                    {...registerChangePassword('confirmPassword')}
                    error={!!errorsChangePassword.confirmPassword}
                    helperText={errorsChangePassword.confirmPassword?.message || ' '}
                    color='secondary'
                    label='Confirm Password'
                    sx={{ width: '300px' }} />
                <Button
                    onClick={handleSubmitChangePassword(handleChangePassword)}
                    sx={{
                        width: '300px',
                        backgroundColor: 'secondary.main',
                        textTransform: 'none',
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
                <Typography variant="h5" sx={{ width: '100%', textAlign: 'start' }}>Add Address</Typography>
                <Divider sx={{
                    width: '100%',
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
                    ':-webkit-scrollbar': 'none',
                    '-ms-scrollbar-width': 'none',
                    scrollbarWidth: 'none',
                }}>
                    {addresses?.map((address, index) => (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '90%',
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
                                <Typography variant="body1" sx={{ width: '100%' }}>Country: {address.country}</Typography>
                                <Typography variant="body1" sx={{ width: '100%' }}>City: {address.city}</Typography>
                                <Typography variant="body1" sx={{ width: '100%' }}>Street: {address.street}</Typography>
                                <Typography variant="body1" sx={{ width: '100%' }}>Zip Code: {address.zipCode}</Typography>
                            </Box>
                            <IconButton onClick={() => handleDeleteAddress(address.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    width: '100%'
                }}>
                    <TextField
                        {...registerAddAddress('country')}
                        error={!!errorsAddAddress.country}
                        helperText={errorsAddAddress.country?.message || ' '}
                        color='secondary'
                        label='Country'
                        sx={{ width: '300px' }} />
                    <TextField {...registerAddAddress('city')}
                        error={!!errorsAddAddress.city}
                        helperText={errorsAddAddress.city?.message || ' '}
                        color='secondary'
                        label='City'
                        sx={{ width: '300px' }} />
                    <TextField {...registerAddAddress('street')}
                        error={!!errorsAddAddress.street}
                        helperText={errorsAddAddress.street?.message || ' '}
                        color='secondary'
                        label='Street'
                        sx={{ width: '300px' }} />
                    <TextField {...registerAddAddress('zipCode')}
                        error={!!errorsAddAddress.zipCode}
                        helperText={errorsAddAddress.zipCode?.message || ' '}
                        color='secondary'
                        label='Zip Code'
                        sx={{ width: '300px' }} />
                    <Button
                    onClick={handleAddAddress(handleCreateAddress)}
                    sx={{
                        width: '300px',
                        backgroundColor: 'secondary.main',
                        textTransform: 'none',
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
                <Typography variant="h5" sx={{ width: '100%', textAlign: 'start' }}>Customize</Typography>
                <Divider sx={{
                    width: '100%',
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
                    <Switch checked={settings?.isDarkMode} name="isDarkMode" onChange={handleUpdateSetting} color="secondary"/>
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
                    <Switch
                    checked={settings?.isEmailNotification}
                    name="isEmailNotification"
                    onChange={handleUpdateSetting}
                    color="secondary" />
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsTab;