import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export const Navbar = (props) => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const history = useHistory();
  const NavTo = ["lesson-1", "lesson-2", "lesson-3", "lesson-4"];
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (_, index) => {
    setSelectedIndex(index);
    history.push(NavTo[index]);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Adventures in Stats
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div onClick={toggleDrawer(false)}>
          <div className={classes.drawerHeader} />
          <Divider />
          <List>
            <ListItem button key="home" component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <Divider />
            {["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"].map(
              (text, index) => {
                return (
                  <ListItem
                    button
                    key={index}
                    selected={selectedIndex === { index }}
                    onClick={(e) => handleListItemClick(e, index)}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                );
              }
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
};
