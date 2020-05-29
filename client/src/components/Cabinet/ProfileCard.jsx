import React from 'react';

import {
  CabinetBox,
  CircleButton,
  CabinetBoxHeader,
  UnderHeaderLine,
  ContentBox,
  ContentItem,
  ContentKey,
  ContentValue,
} from 'components/Cabinet/Cabinet.sc';
import Edit from 'assets/Icons/Edit';

import { Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { setModal } from 'store/cabinetSlice';

export default function ProfileCard() {
  const { firstName, lastName, phone, email, cars, orders } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  return (
    <CabinetBox item lg={10} xs={12}>
      <CabinetBoxHeader>
        Profile
        <UnderHeaderLine />
      </CabinetBoxHeader>
      <Grid container>
        <ContentBox item sm={4} xs={12}>
          <ContentItem>
            <ContentKey>Имя:</ContentKey>
            <ContentValue>{firstName}</ContentValue>
          </ContentItem>
          <ContentItem>
            <ContentKey>Фамилия:</ContentKey>
            <ContentValue>{lastName}</ContentValue>
          </ContentItem>
        </ContentBox>
        <ContentBox item sm={4} xs={12}>
          <ContentItem>
            <ContentKey>Телефон:</ContentKey>
            <ContentValue>{phone}</ContentValue>
          </ContentItem>
          <ContentItem>
            <ContentKey>Почта:</ContentKey>
            <ContentValue>{email}</ContentValue>
          </ContentItem>
        </ContentBox>
        <ContentBox item sm={4} xs={12}>
          <ContentItem>
            <ContentKey>Всего машин:</ContentKey>
            <ContentValue>{cars.length}</ContentValue>
          </ContentItem>
          <ContentItem>
            <ContentKey>Всего заказов:</ContentKey>
            <ContentValue>{orders.length}</ContentValue>
          </ContentItem>
        </ContentBox>
      </Grid>
      <CircleButton
        onClick={() =>
          dispatch(setModal({ name: 'isModalProfile', isOpen: true }))
        }>
        <Edit />
      </CircleButton>
    </CabinetBox>
  );
}
