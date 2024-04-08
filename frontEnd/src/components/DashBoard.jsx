
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ChatModal from './ChatComponents/ChatModal';

import HomePage from './Pages/HomePage';
import ArticlesPage from './Pages/ArticlesPage';
import SafetyInstructionPage from './Pages/SafetyInstructionPage';
import OrganizationPage from './Pages/OrganizationPage.jsx'
import AlertsPage from './Pages/AlertsPage.jsx'
import AddAlertsPage from './Pages/AddAlertsPage.jsx'

import { CheckJwtAuth } from '../API/Users.api.js';

const drawerWidth = 240;

const iconsDict = {
  0: <HomeIcon />,
  1: <ArticleIcon />,
  2: <HealthAndSafetyIcon />,
  3: <BusinessIcon />,
  4: <InventoryIcon />,
  5: <NotificationsIcon />,
  6: <AddAlertIcon />,
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function DashBoard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('Home');
  const [token, setToken] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = CheckJwtAuth(navigate);

    if (user) {
      console.log('User is logged in: ', user);
    }

    const intervalId = setInterval(() => {
      CheckJwtAuth(navigate);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <Box data-testid={'dashBoard'} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <ChatModal />
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentPage} Page
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
            edge="end"
            sx={{
              marginLeft: 'auto',
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Home', page: 'Home' },
            { text: 'Articles', page: 'Articles' },
            { text: 'Safety Instruction', page: 'Safety Instruction' },
            { text: 'Organizations', page: 'Organizations' },
            { text: 'Inventory', page: 'Inventory' },
            { text: 'Alerts', page: 'Alerts' },
            { text: 'Add New Alert', page: 'Add New Alert' },
          ].map(({ text, page }, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleItemClick(page)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {iconsDict[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {currentPage === 'Home' && <HomePage handleItemClick={handleItemClick} />}
        {currentPage === 'Articles' && <ArticlesPage />}
        {currentPage === 'Safety Instruction' && <SafetyInstructionPage />}
        {currentPage === 'Organizations' && <OrganizationPage />}
        {currentPage === 'Alerts' && <AlertsPage />}
        {currentPage === 'Add New Alert' && <AddAlertsPage />}
      </Box>
    </Box>
  );
}
