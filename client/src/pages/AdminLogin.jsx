import React from 'react';

import AdminLoginForm from 'components/Sign/AdminLoginForm';
import { Article } from 'components/Sign/Sign.sc';

import { Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function SignIn() {
  const { isAuth } = useSelector(state => state.admin);

  if (isAuth) {
    return <Redirect to='/admin' />;
  }

  return (
    <Article>
      <Grid container justify='center' alignItems='center'>
        <Grid item lg={4} xs={11}>
          <AdminLoginForm />
        </Grid>
      </Grid>
    </Article>
  );
}
