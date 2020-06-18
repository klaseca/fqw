import React from 'react';
import bg from 'assets/Images/lada.jpg';

import { styled } from '@material-ui/core/styles';

const Section = styled('section')({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
});

const Box = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const Title = styled('h1')({
  color: 'white',
  fontSize: '15em',
  margin: '0',
  '@media (max-width: 768px)': {
    fontSize: '8em',
  },
  '@media (max-width: 320px)': {
    fontSize: '5em',
  },
});

const Text = styled('div')({
  color: 'white',
  fontSize: '5em',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '3em',
  },
});

export default function HeadSection() {
  return (
    <Section>
      <Box>
        <Title>Альтаир</Title>
        <Text>сохраним ваш автомобиль</Text>
      </Box>
    </Section>
  );
}
