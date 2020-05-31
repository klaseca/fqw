import React from 'react';

import SignInForm from 'components/Sign/SignInForm';
import { Article } from 'components/Sign/Sign.sc';

import { Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function SignIn() {
  const { isAuth } = useSelector(state => state.user);

  if (isAuth) {
    return <Redirect to='/cabinet' />;
  }

  return (
    <Article>
      <Grid container justify='center' alignItems='center'>
        <Grid item lg={4} xs={11}>
          <SignInForm />
        </Grid>
      </Grid>
    </Article>
  );
}
