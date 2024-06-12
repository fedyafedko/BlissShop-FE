import { Box, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import ProfileTabs from "../../components/ProfileTabs/ProfileTabs";
import Footer from "../../components/Footer/Footer";

const ProfilePage = () => {
    return (
        <Box>
            <Header />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 0',
                gap: '40px',
            }}>
                <ProfileTabs />
            </Box>
            <Footer />
        </Box>
    );
};

export default ProfilePage;