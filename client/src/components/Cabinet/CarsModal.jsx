import React from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import {
  ModalBox,
  SModal,
  CabinetBoxHeader,
  ContentBox,
} from 'components/Cabinet/Cabinet.sc';

import { useSelector, useDispatch } from 'react-redux';
import {
  setModal,
  setCarData,
  handleChangeCar,
  setCarId,
  resetCarData,
} from 'store/cabinetSlice';
import { updateCar, addCar } from 'store/userSlice';
import { useMountEffect } from 'hooks/useMountEffect';

export default function CarsModal() {
  const { isModalCars, carId, car } = useSelector((state) => state.cabinet);
  const { brand, model, stateNumber, yearOfIssue } = car;
  const { cars } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isEdit = carId !== -1 ? true : false;

  const changeValue = ({ target: { name, value } }) => {
    dispatch(handleChangeCar({ name, value }));
  };

  const closeModalCar = () => {
    dispatch(setModal({ name: 'isModalCars', isOpen: false }));
    dispatch(setCarId(-1));
    dispatch(resetCarData());
  };

  const saveChanges = () => {
    if (isEdit) {
      dispatch(updateCar());
    } else {
      dispatch(addCar());
    }

    closeModalCar();
  };

  useMountEffect(() => {
    if (isEdit) {
      const { carId: id, ...car } = cars.find((car) => car.carId === carId);

      dispatch(setCarData(car));
    }
  });

  return (
    <ModalBox
      open={isModalCars}
      onClose={closeModalCar}
      aria-labelledby='simple-modal-title'>
      <SModal>
        <CabinetBoxHeader>Car</CabinetBoxHeader>
        <Grid container>
          <ContentBox item sm={6} xs={12}>
            <TextField
              id='brand'
              name='brand'
              value={brand}
              onChange={changeValue}
              label='Марка'
            />
          </ContentBox>
          <ContentBox item sm={6} xs={12}>
            <TextField
              id='model'
              name='model'
              value={model}
              onChange={changeValue}
              label='Модель'
            />
          </ContentBox>
          <ContentBox item sm={6} xs={12}>
            <TextField
              id='stateNumber'
              name='stateNumber'
              value={stateNumber}
              onChange={changeValue}
              label='Гос. номер'
            />
          </ContentBox>
          <ContentBox item sm={6} xs={12}>
            <TextField
              id='yearOfIssue'
              name='yearOfIssue'
              value={yearOfIssue}
              onChange={changeValue}
              label='Год выпуска'
            />
          </ContentBox>
          <Grid item sm={12} container justify='center'>
            <Button color='primary' onClick={saveChanges}>
              {isEdit ? 'Сохранить' : 'Добавить'}
            </Button>
            <Button color='primary' onClick={closeModalCar}>
              Отмена
            </Button>
          </Grid>
        </Grid>
      </SModal>
    </ModalBox>
  );
}
