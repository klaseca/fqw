import React from 'react';

import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const SFooter = styled('footer')({
  display: 'flex',
  padding: '30px',
  backgroundColor: '#1e2022'
});

const Box = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

const Phone = styled('div')({
  display: 'flex',
  color: '#fff',
  fontSize: '2em'
});

const SocialMedia = styled('div')({
  display: 'flex'
});

export default function Footer() {
  return (
    <SFooter>
      <Container maxWidth='lg'>
        <Box>
          <Phone>
            +7 923 456 23 32
          </Phone>
          <SocialMedia>

          </SocialMedia>
        </Box>
      </Container>
    </SFooter>
  );
}
