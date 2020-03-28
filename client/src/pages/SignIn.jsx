import React from 'react';

import SignInForm from 'components/Sign/SignInForm';
import { Article } from 'components/Sign/Sign.sc';

import { Grid } from '@material-ui/core';

export default function SignIn() {
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
