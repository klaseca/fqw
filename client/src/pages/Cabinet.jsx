import React from 'react';

import { Article, SContainer } from 'components/Common/StyledComponents';
import ProfileCard from 'components/Cabinet/ProfileCard';
import CarsCard from 'components/Cabinet/CarsCard';
import OrdersCard from 'components/Cabinet/OrdersCard';
import CabinetModal from 'components/Cabinet/CabinetModal';

import { Grid } from '@material-ui/core';

import { useMountEffect } from 'hooks/useMountEffect';
import { useDispatch } from 'react-redux';
import { fetchWithToken } from 'store/userSlice';

export default function Cabinet() {
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(fetchWithToken());
  });

  return (
    <Article>
      <SContainer maxWidth='lg'>
        <Grid container justify='center' alignItems='center'>
          <ProfileCard />
          
          <CarsCard />

          <OrdersCard />

          <CabinetModal />
        </Grid>
      </SContainer>
    </Article>
  );
}
