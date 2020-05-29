import React from 'react';

import { Grid, Button } from '@material-ui/core';
import {
  ModalBox,
  CabinetBoxHeader,
  CabinetBox,
  UnderHeaderLine,
  ContentBox,
  ContentItem,
  ContentKey,
  ContentValue,
} from 'components/Cabinet/Cabinet.sc';

import { useSelector, useDispatch } from 'react-redux';
import { setModal, setOrderId } from 'store/cabinetSlice';
import { getOrder } from 'store/cabinetSlice';
import { useMountEffect } from 'hooks/useMountEffect';

export default function OrderModal() {
  const { isModalOrder, orderId, order } = useSelector(
    (state) => state.cabinet
  );
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setOrderId(-1));
    dispatch(setModal({ name: 'isModalOrder', isOpen: false }));
  };

  useMountEffect(() => {
    dispatch(getOrder(orderId));
  });

  return (
    <ModalBox
      open={isModalOrder}
      onClose={closeModal}
      aria-labelledby='simple-modal-title'>
      <Grid container direction='column' alignItems='center' style={{outline: 'none'}}>
        <Grid container justify='center'>
          <CabinetBox item lg={10} xs={12}>
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
            <Grid item sm={12} container justify='center'>
              <Button color='primary' onClick={closeModal}>
                Закрыть
              </Button>
            </Grid>
          </CabinetBox>
        </Grid>
      </Grid>
    </ModalBox>
  );
}
