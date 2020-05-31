import React from 'react';

import {
  CabinetBox,
  CabinetBoxHeader,
  UnderHeaderLine,
  ContentBox,
  ContentItem,
  ContentKey,
  ContentValue,
} from 'components/Cabinet/Cabinet.sc';
import { NotOrders } from 'components/Admin/Admin.sc';
import StatusSelectBox from 'components/Admin/StatusSelectBox';
import FiltredBox from 'components/Admin/FiltredBox';

import { Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from 'store/adminSlice';
import { useMountEffect } from 'hooks/useMountEffect';

export default function Orders() {
  const { orders } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(getOrders({ dateStart: new Date() }));
  });

  return (
    <Grid container justify='center'>
      <FiltredBox />
      {orders.length === 0 && (
        <NotOrders>Нет заказов данного типа</NotOrders>
      )}
      {orders.map((order) => (
        <CabinetBox item xs={12} key={order.orderId}>
          <CabinetBoxHeader>
            {`Заказ № ${order.orderId}`}
            <UnderHeaderLine />
          </CabinetBoxHeader>
          <Grid container>
            <ContentBox container direction='row' item xs={3}>
              <ContentItem paddingbottom={'0'}>
                <ContentKey>Дата прибытия на сто:</ContentKey>
                <ContentValue>{order.dateStart}</ContentValue>
              </ContentItem>
            </ContentBox>
            <ContentBox container direction='row' item xs={3}>
              <ContentItem paddingbottom={'0'}>
                <ContentKey>Автомобиль:</ContentKey>
                <ContentValue>{order.car}</ContentValue>
              </ContentItem>
            </ContentBox>
            <ContentBox container direction='row' item xs={3}>
              <ContentItem paddingbottom={'0'}>
                <ContentKey>Статус заказа:</ContentKey>
                <ContentValue>{order.status}</ContentValue>
              </ContentItem>
            </ContentBox>
            <ContentBox container direction='row' item xs={3}>
              <ContentItem paddingbottom={'0'}>
                <ContentKey>Предварительная стоимость:</ContentKey>
                <ContentValue>{`${order.price} р.`}</ContentValue>
              </ContentItem>
            </ContentBox>
            {order.orderServices.map((item) => (
              <Grid item container key={item.title}>
                <ContentBox
                  container
                  direction='row'
                  alignItems='center'
                  item
                  xs={4}>
                  <ContentItem paddingbottom={'0'}>
                    <ContentKey>Услуга:</ContentKey>
                    <ContentValue>{item.title}</ContentValue>
                  </ContentItem>
                </ContentBox>
                <ContentBox
                  container
                  direction='row'
                  alignItems='center'
                  item
                  xs={8}>
                  <ContentItem paddingbottom={'0'}>
                    <ContentKey>Виды услуг:</ContentKey>
                    <ContentValue>{item.typeOfService.join(', ')}</ContentValue>
                  </ContentItem>
                </ContentBox>
              </Grid>
            ))}
            <StatusSelectBox
              statusId={order.statusId}
              orderId={order.orderId}
            />
          </Grid>
        </CabinetBox>
      ))}
    </Grid>
  );
}
