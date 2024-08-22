import { Box, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import ProfileTabs from "../../components/ProfileTabs/ProfileTabs";
import Footer from "../../components/Footer/Footer";
import SettingResponse from "../../api/models/response/SettingResponse";

export interface ProfilePageProps {
    handleUpdateSetting: (event: React.ChangeEvent<HTMLInputElement>) => void;
    settings: SettingResponse | undefined;
  }

const ProfilePage : React.FC<ProfilePageProps> = ({ handleUpdateSetting, settings }) => {
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
                <ProfileTabs handleUpdateSetting={handleUpdateSetting} settings={settings}/>
            </Box>
            <Footer />
        </Box>
    );
};

export default ProfilePage;