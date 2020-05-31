import React from 'react';

import WhyWeCard from './WhyWeCard';

import { Container, Grid } from '@material-ui/core';

export default function WhyWeBox() {
  const whyWeData = [
    {
      id: 'qwe',
      title: 'Опытные специалисты',
      icon: 'Engineer',
    },
    {
      id: 'asd',
      title: 'Доступные цены',
      icon: 'Money',
    },
    {
      id: 'zxc',
      title: 'Онлайн запись',
      icon: 'Cabinet',
    },
    {
      id: 'cvb',
      title: 'Современное оборудование',
      icon: 'Equip',
    },
  ];

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        {whyWeData.map((item) => (
          <Grid xs={12} lg={3} item key={item.id}>
            <WhyWeCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
