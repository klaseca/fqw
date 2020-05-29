import React from 'react';

import {
  SCarItem,
  ContentBox,
  ContentItem,
  ContentKey,
  ContentValue,
  BtnBox,
} from './Cabinet.sc';

import { Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { setModal, setOrderId } from 'store/cabinetSlice';

export default function OrdersBox({ orders, orderTitles }) {
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(setOrderId(id));
    dispatch(setModal({ name: 'isModalOrder', isOpen: true }));
  };

  return (
    <ContentBox container direction='row'>
      {orders.map((order) => {
        const { orderId, ...filtredOrder } = order;

        return (
          <SCarItem
            item
            md={3}
            xs={12}
            container
            direction='column'
            key={orderId}>
            {Object.entries(filtredOrder).map(([key, value]) => (
              <ContentItem key={key}>
                <ContentKey>{orderTitles[key]}</ContentKey>
                <ContentValue>{value}</ContentValue>
              </ContentItem>
            ))}
            <BtnBox>
              <Button color='primary' onClick={() => openModal(orderId)}>
                Подробнее
              </Button>
            </BtnBox>
          </SCarItem>
        );
      })}
    </ContentBox>
  );
}
