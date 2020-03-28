import React from 'react';

import WhyWeBox from './WhyWeBox';

import { styled } from '@material-ui/core/styles';

const Section = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  padding: '30px'
});

const Title = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '5em',
  paddingBottom: '30px'
});

export default function WhyWe() {
  return (
    <Section>
      <Title>Почему мы?</Title>
      <WhyWeBox />
    </Section>
  );
}
