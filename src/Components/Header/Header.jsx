import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import { ArrowBack, Logout } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Avatar, Box, Button, Paper, Tooltip, Typography, createTheme } from '@mui/material'
import Signup from '../Authorization/Signup';
import Login from '../Authorization/Login';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { user_logout } from '../../Redux/Action/AuthAction';
export default function Header() {
  const theme = createTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.Auth)
  const [islogin, setislogin] = useState(false)
  const [issignup, setissignup] = useState(false)
  const [isAvatarClicked, setisAvatarClicked] = useState(false)
  const [isDrawer, setisDrawer] = useState(false)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const handleProfile = () => {
    setisAvatarClicked(false)
    navigate('/Dashboard')
  }
  const handleCart = () => {
    setisAvatarClicked(false)
    navigate('/Cart')
  }
  const handleOrder = () => {
    setisAvatarClicked(false)
    navigate('/Admin/orderlist')
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, position: 'relative', }}
      role="presentation"

      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ArrowBack sx={{ position: 'absolute', top: '18px', right: '18px', bgcolor: 'primary.main', color: '#fff', borderRadius: '50%', p: .5, zIndex: 1, cursor: 'pointer' }} onClick={() => setisDrawer(false)} />
      <List>
        {['Home', 'Products', 'Paginate', 'FAQs'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => { text === 'Products' ? navigate('/Product') : text === 'FAQs' ? navigate('/FAQs') : text === 'Paginate' ? navigate('/Paginate') : navigate('/') }}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {!auth.isAuthenticated ? ['Login', 'Sign Up'].map((text, index) => (<>
          <ListItem key={text} disablePadding sx={{ bgcolor: 'primary.main', rowGap: 1 }} onClick={
            text === 'Login' ? () => setislogin(true) : () => setissignup(true)
          }>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: '#fff' }} />
            </ListItemButton>

          </ListItem>
          <Divider sx={{ my: .1 }} />
        </>
        )) : <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, position: 'relative' }}>
          <Tooltip title="Click To Show Menu">
            <Avatar src={auth.user.image} sx={{ mx: 'auto', height: '6rem', width: '6rem', cursor: 'pointer' }} onClick={() => setisAvatarClicked(!isAvatarClicked)} />
          </Tooltip>
          <Button variant='contained' endIcon={<Logout />} onClick={() => dispatch(user_logout())}>Logout</Button>
          <Box component={'ul'} sx={{ display: isAvatarClicked ? 'flex' : 'none', flexDirection: 'column', pl: 0, width: '90%', position: 'absolute', listStyle: 'none', overflow: 'hidden', top: '70%', right: '5%', zIndex: 'tooltip', border: '1px solid gray' }}>
            {
              ['Profile', 'Cart', 'Orders'].map((item) => <Box component={'li'} sx={{ p: 2, border: '1px solid gray', width: '100%', bgcolor: '#fff', '&:hover': { bgcolor: 'lightgray', cursor: 'pointer' } }} onClick={item === 'Profile' ? handleProfile : item === 'Cart' ? handleCart : handleOrder}>{item}</Box>)
            }
          </Box>
        </Box>}
      </List>
    </Box>
  );


  return (

    <Paper elevation={3} sx={{ boxSizing: 'border-box', width: '100%', height: '80px', display: 'flex', justifyContent: 'space-between', px: 2, alignItems: 'center' }}>
      {
        islogin && <Login islogin={islogin} setislogin={setislogin} setissignup={setissignup} />

      }
      {
        issignup && <Signup issignup={issignup} setissignup={setissignup} setislogin={setislogin} />
      }
      {
        isDrawer && <SwipeableDrawer
          anchor='right'
          open={isDrawer}
          onClose={toggleDrawer(isDrawer, false)}
          onOpen={toggleDrawer(!isDrawer, true)}
        >
          {list('right')}
        </SwipeableDrawer>
      }
      <Typography variant='h5' sx={{ borderBottom: '2px solid' + theme.palette.secondary.main, color: theme.palette.primary.main, '&:after': { content: '"Palace"', color: theme.palette.secondary.main }, cursor: 'pointer' }}>Posh</Typography>
      <Box component={'ul'} sx={{ display: 'flex', listStyle: 'none', mb: -0.3 }} className='mobile_header'>
        {
          ['Home', 'Products', 'Paginate', 'FAQs'].map((item) => <Box component={'li'} sx={{ px: 2, cursor: 'pointer' }}><Typography variant='h6' sx={{ fontWeight: 500 }} onClick={() => { item === 'Products' ? navigate('/Product') : item === 'FAQs' ? navigate('/FAQs') : item === 'Paginate' ? navigate('/Paginate') : navigate('/') }}>{item}</Typography></Box>)
        }
      </Box>
      <Box className='mobile_header' sx={{ display: auth.isAuthenticated ? 'none' : 'flex' }}>
        <Button variant='contained' sx={{ mr: 2 }} endIcon={<LoginIcon />} onClick={() => { setislogin(true); setissignup(false) }}>Login</Button>
        <Button variant='contained' endIcon={<VpnKeyIcon />} onClick={() => { setissignup(true); setislogin(false) }}>Signup</Button>
      </Box>
      <Box className='mobile_header' sx={{ display: auth.isAuthenticated ? 'flex' : 'none', position: 'relative' }}>
        <Tooltip title="Click To Show Menu">
          <Avatar src={auth.user.image} sx={{ cursor: 'pointer' }} onClick={() => setisAvatarClicked(!isAvatarClicked)} />

        </Tooltip>
        <Button sx={{ ml: 2 }} variant='outlined' endIcon={<Logout />} onClick={() => dispatch(user_logout())}>Logout</Button>
        <Box component={'ul'} sx={{ display: isAvatarClicked ? 'flex' : 'none', flexDirection: 'column', pl: 0, width: '100%', position: 'absolute', listStyle: 'none', overflow: 'hidden', top: '90%', right: '70%', zIndex: 'tooltip', border: '1px solid gray' }}>
          {
            ['Profile', 'Cart', 'Orders'].map((item) => <Box component={'li'} sx={{ p: 2, border: '1px solid gray', width: '100%', bgcolor: '#fff', '&:hover': { bgcolor: 'lightgray', cursor: 'pointer' } }} onClick={item === 'Profile' ? handleProfile : item === 'Cart' ? handleCart : handleOrder}>{item}</Box>)

          }
        </Box>
      </Box>


      <MenuIcon sx={{ fontSize: '3rem', color: 'primary.main', display: 'none' }} className='mobile_bar' onClick={() => setisDrawer(true)} />



    </Paper>
  )
}
