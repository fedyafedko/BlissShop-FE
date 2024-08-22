import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileTab from './ProfileTab/ProfileTab';
import SettingsTab from './SettingsTab/SettingsTab';
import { ProfilePageProps } from '../../pages/ProfilePage/ProfilePage';
import OrderTab from './OrderTab/OrderTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const ProfileTabs : React.FC<ProfilePageProps> = ({ handleUpdateSetting, settings })  => {
  const [value, setValue] = React.useState<number>(parseInt(localStorage.getItem('profileTab') ?? '0'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    localStorage.setItem('profileTab', newValue.toString());
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: '11%' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="Vertical tabs example"
        sx={{
            display: 'flex',
            justifySelf: 'flex-start',
            minWidth: '14%',
            borderRight: 1,
            borderColor: 'divider',
          }}
      >
        <Tab label="Profile" {...a11yProps(0)} sx={{ textTransform: 'none', fontSize: '20px', alignItems: 'flex-start'}}/>
        <Tab label="Settings" {...a11yProps(1)} sx={{ textTransform: 'none', fontSize: '20px', alignItems: 'flex-start'}}/>
        <Tab label="My Orders" {...a11yProps(2)} sx={{ textTransform: 'none', fontSize: '20px', alignItems: 'flex-start'}}/>
        <Tab label="My Subscriptions" {...a11yProps(3)} sx={{ textTransform: 'none', fontSize: '20px', alignItems: 'flex-start'}}/>
        <Tab label="My Shops" {...a11yProps(4)} sx={{ textTransform: 'none', fontSize: '20px', alignItems: 'flex-start'}}/>
      </Tabs>
      <Box>
        <TabPanel value={value} index={0}>
          <ProfileTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SettingsTab handleUpdateSetting={handleUpdateSetting} settings={settings}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OrderTab />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
      </Box>
    </Box>
  );
}

export default ProfileTabs;