import React from 'react';

import { Article, SContainer } from 'components/Common/StyledComponents';
import {
  CabinetBox,
  CabinetBoxHeader,
  UnderHeaderLine,
} from 'components/Cabinet/Cabinet.sc';
import SelectServices from 'components/NewOrder/SelectBox';
import SelectDateAndCar from 'components/NewOrder/SelectDateAndCar';
import BtnBox from 'components/NewOrder/BtnBox';

import { Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { fetchServices, changeIsSuccesRedirect, setIsError } from 'store/newOrderSlice';
import { fetchWithToken } from 'store/userSlice';
import { useMountEffect } from 'hooks/useMountEffect';
import { Redirect } from 'react-router-dom';

export default function NewOrder() {
  const { isSuccessRedirect } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchWithToken());

    return () => {
      dispatch(changeIsSuccesRedirect(false));
      dispatch(setIsError(false));
    };
  });

  if (isSuccessRedirect) return <Redirect to='/myorders' />;

  return (
    <Article>
      <SContainer maxWidth='lg'>
        <Grid container justify='center'>
          <CabinetBox item lg={10} xs={12}>
            <CabinetBoxHeader>
              Оформление нового заказа
              <UnderHeaderLine />
            </CabinetBoxHeader>
            <Grid container>
              <SelectServices />
              <SelectDateAndCar />
              <BtnBox />
            </Grid>
          </CabinetBox>
        </Grid>
      </SContainer>
    </Article>
  );
}
