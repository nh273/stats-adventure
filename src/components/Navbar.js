import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export const Navbar = (props) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer(true)}>open drawer</Button>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="drawer-opened" onClick={toggleDrawer(false)}>
          <List>
            {["Home", "Lessons", "About"].map((text, index) => {
              return (
                <ListItem button key={index}>
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
};
