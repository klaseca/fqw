import React from 'react';

import SignUpForm from 'components/Sign/SignUpForm';
import { Article } from 'components/Sign/Sign.sc';

import { Grid } from '@material-ui/core';

import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function SignUp() {
  const { isAuth } = useSelector(state => state.user);

  if (isAuth) {
    return <Redirect to='/cabinet' />;
  }

  return (
    <Article>
      <Grid container justify='center' alignItems='center'>
        <Grid item lg={4} xs={11}>
          <SignUpForm />
        </Grid>
      </Grid>
    </Article>
  );
}
