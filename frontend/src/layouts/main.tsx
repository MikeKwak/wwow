import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Login from 'components/LoginButton';
import Logout from 'components/LogoutButton';
import { useUser } from 'userContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const links = [
    { text: 'Browse Cars', path: '/search' },
    { text: 'My Favourites', path: '/favourites' },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {links.map(({ text, path }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={path}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Container disableGutters maxWidth={false} sx={{ position: 'relative' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WwoW 1.0
          </Typography>
          {user ? (
            <>
              <Logout />
              <Avatar alt="Remy Sharp" src={user.imgUrl} />
            </>
          ) : (
            <Login />
          )}
          <Button onClick={toggleDrawer(true)} sx={{ color: 'white' }}>
            <MenuIcon />
          </Button>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Toolbar>
      </AppBar>
      <Toolbar />{' '}
      {/* Add an empty Toolbar to push the content below the AppBar */}
      {children}
    </Container>
  );
};

export default Layout;
