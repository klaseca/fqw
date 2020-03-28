import React from 'react';

import SignUpForm from 'components/Sign/SignUpForm';
import { Article } from 'components/Sign/Sign.sc';

import { Grid } from '@material-ui/core';

export default function SignUp() {
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
