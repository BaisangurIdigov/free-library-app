import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ContactsIcon from "@material-ui/icons/ImportContacts";
import Crop54Icon from "@material-ui/icons/Crop54";
import { NavLink } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from 'react-redux'
import { auth, exit } from '../redux/features/application'
import { Avatar } from '@material-ui/core'
import Box from '@material-ui/core/Box'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  display: {
    marginLeft: "80%"
  }
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.items)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    dispatch(exit());
  };

  if (auth){
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar
          position="fixed"
          style={{backgroundColor:'#4B0082'}}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Демократичная Библиотека
            </Typography>
            <Box className={classes.display}>
                <NavLink to="/profile">
                  <Avatar alt="Remy Sharp" src={users?.img} />
                </NavLink>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader} >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon  />
              )}
            </IconButton>
          </div>
          <Divider />

          <List>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <ListItem button text="text">
                <ListItemIcon>
                  <Crop54Icon />
                </ListItemIcon>
                <ListItemText style={{color:'#4B0082'}} primary="Главная" />
              </ListItem>
            </NavLink>

            <NavLink to="/rentBook" style={{ textDecoration: "none"}}>
              <ListItem button text="text">
                <ListItemIcon>
                  <ContactsIcon />
                </ListItemIcon>
                <ListItemText style={{color:'#4B0082'}} primary="Вы читаете" />
              </ListItem>
            </NavLink>

            <NavLink to="/MyBooks" style={{ textDecoration: "none" }}>
              <ListItem button text="text">
                <ListItemIcon>
                  <ContactsIcon />
                </ListItemIcon>
                <ListItemText style={{color:'#4B0082'}} primary="Мои книги" />
              </ListItem>
            </NavLink>
            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <ListItem button text="text">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText style={{color:'#4B0082'}} primary="Профиль" />
              </ListItem>
            </NavLink>
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              <ListItem button text="text" onClick={handleExit}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText style={{color:'#4B0082'}} primary="Выход" />
              </ListItem>
            </NavLink>
          </List>

          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {children}
        </main>
      </div>
    );
  }
}
