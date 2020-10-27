import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography } from '@material-ui/core';
import React from 'react';

export const Header = () => (
  <AppBar position="static" color="secondary">
    <Toolbar>
      <Typography variant="h6">
        JSON Similarity Score
      </Typography>
    </Toolbar>
  </AppBar>
);
