import React from 'react';

import WhyWeCard from './WhyWeCard';

import { Container, Grid } from '@material-ui/core';

export default function WhyWeBox() {
  const whyWeData = [
    {
      id: 'qwe',
      title: 'zxcz',
      icon: 'Engineer'
    },
    {
      id: 'asd',
      title: 'zxczxc',
      icon: 'Money'
    },
    {
      id: 'zxc',
      title: 'zxczxc',
      icon: 'Cabinet'
    },
    {
      id: 'cvb',
      title: 'zxczxc',
      icon: 'Equip'
    }
  ];

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        {whyWeData.map(item => (
          <Grid xs={12} lg={3} item key={item.id}>
            <WhyWeCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
