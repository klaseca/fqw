import React from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import {
  ModalBox,
  SModal,
  CabinetBoxHeader,
  ContentBox,
} from 'components/Cabinet/Cabinet.sc';

import { useSelector, useDispatch } from 'react-redux';
import { setModal, setUserData, handleChangeUser } from 'store/cabinetSlice';
import { updateData } from 'store/userSlice';
import { useMountEffect } from 'hooks/useMountEffect';

export default function CabinetModal() {
  const { isModalProfile } = useSelector((state) => state.cabinet);
  const { firstName, lastName, email, phone } = useSelector(
    (state) => state.cabinet.user
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      })
    );
  });

  const changeValue = ({ target: { name, value } }) => {
    dispatch(handleChangeUser({ name, value }));
  };

  const closeModalProfile = () => {
    dispatch(setModal({ name: 'isModalProfile', isOpen: false }));
  };

  const saveChanges = () => {
    dispatch(updateData());
    closeModalProfile();
  };

  return (
    <ModalBox
      open={isModalProfile}
      onClose={closeModalProfile}
      aria-labelledby='simple-modal-title'>
      <SModal>
        <CabinetBoxHeader>Yeader</CabinetBoxHeader>
        <Grid container>
          <ContentBox item sm={6} xs={12}>
            <TextField
              id='firstName'
              name='firstName'
              value={firstName}
              onChange={changeValue}
              label='Имя'
            />
          </ContentBox>
          <ContentBox item sm={6} xs={12}>
            <TextField
              id='lastName'
              name='lastName'
              value={lastName}
              onChange={changeValue}
              label='Фамилия'
            />
          </ContentBox>
          <ContentBox item sm={6} xs={12}>
            <TextField
              id='email'
              name='email'
              value={email}
              onChange={changeValue}
              label='Почта'
            />
          </ContentBox>
          <ContentBox item sm={6} xs={12}>
            <TextField
              id='phone'
              name='phone'
              value={phone}
              onChange={changeValue}
              label='Телефон'
            />
          </ContentBox>
          <Grid item sm={12} container justify='center'>
            <Button color='primary' onClick={saveChanges}>Save</Button>
            <Button color='primary' onClick={closeModalProfile}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </SModal>
    </ModalBox>
  );
}
