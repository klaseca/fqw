import React from 'react';

import { Article, SContainer } from 'components/Common/StyledComponents';
import { Title } from 'components/Services/Services.sc';

import {
  CabinetBox,
  CabinetBoxHeader,
  UnderHeaderLine,
  ContentBox,
  ContentItem,
  ContentKey,
  ContentValue,
} from 'components/Cabinet/Cabinet.sc';

import { Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from 'store/myOrdersSlice';
import { useMountEffect } from 'hooks/useMountEffect';

export default function MyOrders() {
  const { orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(getOrders());
  });

  return (
    <Article>
      <SContainer maxWidth='lg'>
        <Grid container direction='column' alignItems='center'>
          <Title>Мои заказы</Title>
          <Grid container justify='center'>
            {orders.length === 0 && (
              <div style={{fontSize: '2em'}}>Заказов не найдено</div>
            )}
            {orders.map((order) => (
              <CabinetBox item lg={10} xs={12} key={order.orderId}>
                <CabinetBoxHeader>
                  {`Заказ № ${order.orderId}`}
                  <UnderHeaderLine />
                </CabinetBoxHeader>
                <Grid container>
                  <ContentBox
                    container
                    direction='row'
                    alignItems='center'
                    justify='space-around'
                    item
                    xs={12}>
                    <ContentItem paddingbottom={'0'}>
                      <ContentKey>Дата прибытия на сто:</ContentKey>
                      <ContentValue>{order.dateStart}</ContentValue>
                    </ContentItem>
                    <ContentItem paddingbottom={'0'}>
                      <ContentKey>Автомобиль:</ContentKey>
                      <ContentValue>{order.car}</ContentValue>
                    </ContentItem>
                    <ContentItem paddingbottom={'0'}>
                      <ContentKey>Статус заказа:</ContentKey>
                      <ContentValue>{order.status}</ContentValue>
                    </ContentItem>
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
                          <ContentValue>
                            {item.typeOfService.join(', ')}
                          </ContentValue>
                        </ContentItem>
                      </ContentBox>
                    </Grid>
                  ))}
                </Grid>
              </CabinetBox>
            ))}
          </Grid>
        </Grid>
      </SContainer>
    </Article>
  );
}
