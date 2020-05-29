import React from 'react';

import {
  SCarItem,
  ContentBox,
  ContentItem,
  ContentKey,
  ContentValue,
} from './Cabinet.sc';

import { Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { setModal, setCarId } from 'store/cabinetSlice';

export default function CarsBox({ cars, carTitles }) {
  const dispatch = useDispatch();

  const openEditModal = (id) => {
    dispatch(setCarId(id));
    dispatch(setModal({ name: 'isModalCars', isOpen: true }));
  };

  const openDelModal = (id) => {
    dispatch(setCarId(id));
    dispatch(setModal({ name: 'isModalDelete', isOpen: true }));
  };

  return (
    <ContentBox container>
      {cars.map((car) => {
        const { carId, ...filtredCar } = car;

        return (
          <SCarItem item container justify='space-between' key={carId}>
            {Object.entries(filtredCar).map(([key, value]) => (
              <ContentItem key={key} paddingbottom={'0'} item md={2} xs={6}>
                <ContentKey>{carTitles[key]}</ContentKey>
                <ContentValue>{value}</ContentValue>
              </ContentItem>
            ))}
            <ContentItem
              paddingbottom={'0'}
              container
              justify='space-between'
              item
              md={2}
              xs={12}>
              <Button onClick={() => openEditModal(carId)}>Редактировать</Button>
              <Button onClick={() => openDelModal(carId)}>Удалить</Button>
            </ContentItem>
          </SCarItem>
        );
      })}
    </ContentBox>
  );
}
