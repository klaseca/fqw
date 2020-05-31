import React from 'react';

import { Grid, Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { updateOrderStatus } from 'store/adminSlice';

export default function StatusSelectBox({ statusId, orderId }) {
  const dispatch = useDispatch();

  return (
    <Grid container justify='space-around'>
      <Button
        variant='contained'
        color='primary'
        disabled={!(statusId === 1)}
        onClick={() => dispatch(updateOrderStatus({ orderId, statusId: 2 }))}>
        Автомобиль прибыл
      </Button>
      <Button
        variant='contained'
        color='primary'
        disabled={!(statusId === 2)}
        onClick={() => dispatch(updateOrderStatus({ orderId, statusId: 3 }))}>
        Работы завершены
      </Button>
      <Button
        variant='contained'
        color='primary'
        disabled={!(statusId === 3)}
        onClick={() => dispatch(updateOrderStatus({ orderId, statusId: 4 }))}>
        Владелец забрал автомобиль
      </Button>
    </Grid>
  );
}
