import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#1e2022'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const SLink = styled(Link)({
  color: '#fff',
  padding: '10px',
  textDecoration: 'none',
  fontSize: '1.5em'
})

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            СТО Альтаир
          </Typography>
          <div>
            <SLink to='/news'>News</SLink>
            <SLink to='/signin'>Sign in</SLink>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
