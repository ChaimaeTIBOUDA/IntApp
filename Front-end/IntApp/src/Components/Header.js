import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, Tooltip, Avatar,  TextField, SwipeableDrawer, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import { blue } from '@mui/material/colors';
import useFetch from '../useFetch';

const drawerWidth = 240;

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

export default function Header() {
  const theme = useTheme();
  const [drawer, setDrawer] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
   const data = useFetch(`http://localhost:5000/admin`)

  const handleChange = (event, Value) => {
    setValue(Value);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuItems = [
    {
      label:'Home',
      icon: <HomeOutlinedIcon color='primary' />,
      path: "/"
    },
    {
      label:'Interns',
      icon: <Person2OutlinedIcon color='primary' />,
      path: "/Interns"
    },
  ]

  return (
    <>
      <AppBar position="fixed" open={open} color="inherit" sx={{height:'56px'}}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
            color="primary"
          >
            <MenuIcon />
          </IconButton>
          <Box
                sx={{ flexGrow: 1}}
              >
                <Box>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Home" onClick={() => navigate('/')}/>
          <Tab label="Interns" onClick={() => navigate('/Interns')}/>
        </Tabs>
      </Box>
      </Box>
      <Tooltip>
        <IconButton
        onClick={()=> setDrawer(true)} >
        <Avatar sx={{bgcolor: blue[500]}}>C</Avatar>
        
          </IconButton>             
        <SwipeableDrawer
                  anchor='right'
                  open={drawer}
                  onClose={() => setDrawer(false)}
                  >
                    <IconButton onClick={()=> {setDrawer(false)}} sx={{mt:7, ml:-35}}>
                      <ArrowBackIcon />
                    </IconButton>
                    <Box
                component="form"
                width='300px'
                mt={1}
                ml={2}
                mr={0.5}
                noValidate
                autoComplete="off"
              >
                <Typography variant='h5'>
                Profile
            </Typography>
            {  data && data.map((d) => (
                    <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '30ch' },
                      }}
                      noValidate
                      autoComplete="off">
                    <TextField
                    label="User_name"
                    defaultValue={d.username}
                    InputProps={{
                        readOnly: true
                    }}
                    focused
                    color='primary'
                    margin='normal'
                    />
                    <TextField
                    label="Last name"
                    defaultValue={d.name}
                    InputProps={{
                        readOnly: true
                    }}
                    color='primary'
                    margin='normal'
                    focused
                    />
                    <TextField
                    label="First name"
                    defaultValue={d.firstname}
                    InputProps={{
                        readOnly: true
                    }}
                    color='primary'
                    margin='normal'
                    focused
                    />
                    <TextField
                    label="Email"
                    defaultValue={d.email}
                    InputProps={{
                        readOnly: true
                    }}
                    color='primary'
                    margin='normal'
                    focused
                    />
                    </Box>
                  ))}
              </Box>
                  </SwipeableDrawer>
                  <IconButton onClick={()=> navigate('/Login')}>
                    <LogoutIcon />
                  </IconButton>
              </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
        {menuItems.map((item) => (
                  <ListItemButton
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label}/>
                </ListItemButton>
               ))}
        </List>
      </Drawer>
      
    </>
  );
}
