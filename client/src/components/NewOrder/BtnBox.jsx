import React from 'react';

import { ContentBox } from 'components/Cabinet/Cabinet.sc';
import { ErrorBox } from 'components/Sign/Sign.sc';

import { Grid, Button } from '@material-ui/core';

import { addOrderItem, createNewOrder, setIsError } from 'store/newOrderSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function BtnBox() {
  const { orderItems, carChanged, isError } = useSelector(
    (state) => state.newOrder
  );
  const dispatch = useDispatch();

  const create = () => {
    const errors = orderItems.map((item) =>
      !item.serviceId || item.typeOfServices.length === 0 ? true : false
    );

    if (errors.includes(true) || !carChanged) {
      dispatch(setIsError(true));
    } else {
      dispatch(setIsError(false));
      dispatch(createNewOrder());
    }
  };

  return (
    <>
      <Grid item container>
        <ContentBox item xs={6}>
          <Button onClick={() => dispatch(addOrderItem())}>
            Добавить услугу
          </Button>
        </ContentBox>
        <ContentBox item xs={6}>
          <Button onClick={create}>Оформить заказ</Button>
        </ContentBox>
      </Grid>
      {isError && (
        <Grid container justify='center'>
          <ErrorBox>Заполните все поля</ErrorBox>
        </Grid>
      )}
    </>
  );
}
