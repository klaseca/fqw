import React from 'react';

import {
  ModalBox,
  SModal,
  CabinetBoxHeader,
} from 'components/Cabinet/Cabinet.sc';
import ProfileForm from 'components/Cabinet/ProfileForm';

import { useSelector, useDispatch } from 'react-redux';
import { setModal, setUserData } from 'store/cabinetSlice';
import { updateData } from 'store/userSlice';

import { useMountEffect } from 'hooks/useMountEffect';

import { Formik } from 'formik';
import * as Yup from 'yup';

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

  const closeModalProfile = () => {
    dispatch(setModal({ name: 'isModalProfile', isOpen: false }));
  };

  return (
    <ModalBox
      open={isModalProfile}
      onClose={closeModalProfile}
      aria-labelledby='simple-modal-title'>
      <SModal>
        <CabinetBoxHeader>Мои данные</CabinetBoxHeader>
        <Formik
          initialValues={{ firstName, lastName, email, phone }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .trim()
              .min(2, 'Минимум 2 символа')
              .required('Обязательное поле'),
            lastName: Yup.string()
              .trim()
              .min(2, 'Минимум 2 символа')
              .required('Обязательное поле'),
            email: Yup.string()
              .trim()
              .email('Некорректные почтовые данные')
              .required('Обязательное поле'),
            phone: Yup.string()
              .trim()
              .matches(
                /^([\\+]7|8?)?[-\s\\.]?9[0-9]{2}[-\s\\.]?[0-9]{7}$/gim,
                'Некорректный номер телефона'
              )
              .required('Обязательное поле'),
          })}
          onSubmit={(values, actions) => {
            dispatch(updateData(values));
            closeModalProfile();
          }}>
          {(props) => (
            <ProfileForm closeModalProfile={closeModalProfile} {...props} />
          )}
        </Formik>
      </SModal>
    </ModalBox>
  );
}
