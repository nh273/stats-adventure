import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";

export const Navbar = (props) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const NavTo = ["lesson-1", "lesson-2", "lesson-3", "lesson-4"];

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="drawer-opened" onClick={toggleDrawer(false)}>
          <List>
            {["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"].map(
              (text, index) => {
                return (
                  <ListItem button key={index}>
                    <NavLink to={NavTo[index]}>
                      <ListItemText primary={text} />
                    </NavLink>
                  </ListItem>
                );
              }
            )}
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
};
