import React from 'react';

import { Grid, Button } from '@material-ui/core';
import {
  ModalBox,
  SModal,
  CabinetBoxHeader,
} from 'components/Cabinet/Cabinet.sc';

import { useSelector, useDispatch } from 'react-redux';
import { setModal, setCarId } from 'store/cabinetSlice';
import { deleteCar } from 'store/userSlice';

export default function DeleteModal() {
  const { isModalDelete, carId } = useSelector((state) => state.cabinet);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setCarId(-1));
    dispatch(setModal({ name: 'isModalDelete', isOpen: false }));
  };

  const saveChanges = () => {
    dispatch(deleteCar(carId));
    closeModal();
  };

  return (
    <ModalBox
      open={isModalDelete}
      onClose={closeModal}
      aria-labelledby='simple-modal-title'>
      <SModal>
        <CabinetBoxHeader>Удалить автомобиль?</CabinetBoxHeader>
        <Grid item style={{padding: '10px', fontSize: '1.7em'}}>
          Удаление автомобиля приведет к автоматическому удалению заказов,
          связанных с данным автомобилем. Продолжить?
        </Grid>
        <Grid item sm={12} container justify='center'>
          <Button color='primary' onClick={saveChanges}>
            Удалить
          </Button>
          <Button color='primary' onClick={closeModal}>
            Отмена
          </Button>
        </Grid>
      </SModal>
    </ModalBox>
  );
}
