import React, { useState } from 'react';

import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';

import { Link, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from 'store/userSlice';
import { adminLogout } from 'store/adminSlice';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#1e2022',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#fff',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const SLink = styled(Link)({
  color: '#fff',
  padding: '10px',
  textDecoration: 'none',
  fontSize: '1.5em',
});

const Profile = styled('div')({
  color: '#c9d6df',
  padding: '10px',
  fontSize: '1.5em',
  cursor: 'pointer',
});

const ToolbarItems = ({ firstName, isAdmin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toPath = (path) => {
    history.push(path);
    handleClose();
  };

  return (
    <>
      <Profile
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}>
        {firstName}
      </Profile>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {isAdmin ? (
          <div>
            <MenuItem onClick={() => toPath('/admin')}>Админ. панель</MenuItem>
            <MenuItem onClick={() => dispatch(adminLogout())}>Выйти</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => toPath('/cabinet')}>Кабинет</MenuItem>
            <MenuItem onClick={() => dispatch(userLogout())}>Выйти</MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
};

export default function Header() {
  const { isAuth, firstName } = useSelector((state) => state.user);
  const { isAuth: isAuthAdmin, firstName: firstNameAdmin } = useSelector(
    (state) => state.admin
  );
  const classes = useStyles();

  return (
    <div>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Link to='/' className={classes.title}>
            <Typography variant='h6'>СТО Альтаир</Typography>
          </Link>
          <div className={classes.box}>
            <SLink to='/services'>Услуги</SLink>
            {isAuth ? (
              <ToolbarItems firstName={firstName} isAdmin={false} />
            ) : isAuthAdmin ? (
              <ToolbarItems firstName={firstNameAdmin} isAdmin={true} />
            ) : (
              <SLink to='/signin'>Войти</SLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
