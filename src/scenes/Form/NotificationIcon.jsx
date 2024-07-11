// src/components/NotificationIcon.js

import React, { useState } from "react";
import { IconButton, Badge, Popover, List, ListItem, ListItemText } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const NotificationIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = [
    { id: 1, message: "Formation X atteint la date de fin" },
    { id: 2, message: "Evaluation pour la formation Y aujourd'hui" },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText primary={notification.message} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default NotificationIcon;
