import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const SFooter = styled('footer')({
  display: 'flex',
  padding: '30px',
  backgroundColor: '#1e2022',
});

const Text = styled('div')({
  display: 'flex',
  fontSize: '1.5em',
  color: '#fff',
  padding: '5px',
});

const Phone = styled('div')({
  display: 'flex',
  color: '#fff',
  fontSize: '2em',
});

export default function Footer() {
  return (
    <SFooter>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={6} container direction='column'>
            <Text>Телефон:</Text>
            <Phone>+7 (8452) 43-00-44</Phone>
          </Grid>
          <Grid item xs={6} container direction='column'>
            <Text>Адрес:</Text>
            <Phone>
              410038, г. Саратов, 5-й Соколовогорский пр-д, дом № б/№, литера В,
              В1
            </Phone>
          </Grid>
        </Grid>
      </Container>
    </SFooter>
  );
}
