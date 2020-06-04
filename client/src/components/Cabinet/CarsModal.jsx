import React from 'react';

import {
  ModalBox,
  SModal,
  CabinetBoxHeader,
} from 'components/Cabinet/Cabinet.sc';
import CarsForm from 'components/Cabinet/CarsForm';

import { useSelector, useDispatch } from 'react-redux';
import {
  setModal,
  setCarData,
  setCarId,
  resetCarData,
} from 'store/cabinetSlice';
import { updateCar, addCar } from 'store/userSlice';
import { useMountEffect } from 'hooks/useMountEffect';

import { Formik } from 'formik';
import * as Yup from 'yup';

export default function CarsModal() {
  const { isModalCars, carId, car } = useSelector((state) => state.cabinet);
  const { brand, model, stateNumber, yearOfIssue } = car;
  const { cars } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isEdit = carId !== -1 ? true : false;

  const closeModalCar = () => {
    dispatch(setModal({ name: 'isModalCars', isOpen: false }));
    dispatch(setCarId(-1));
    dispatch(resetCarData());
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
        <CabinetBoxHeader>Автомобиль</CabinetBoxHeader>
        <Formik
          initialValues={{ brand, model, stateNumber, yearOfIssue }}
          validationSchema={Yup.object({
            brand: Yup.string()
              .trim()
              .min(2, 'Поле должно содержать минимум 2 символова')
              .required('Обязательное поле'),
            model: Yup.string()
              .trim()
              .min(2, 'Поле должно содержать минимум 2 символова')
              .required('Обязательное поле'),
            stateNumber: Yup.string()
              .trim()
              .matches(
                /^[а-яА-ЯёЁ]{1}[0-9]{3}[а-яА-ЯёЁ]{2}$/gim,
                "Пример номера 'а123бв'"
              )
              .required('Обязательное поле'),
            yearOfIssue: Yup.number()
              .typeError('Только цифры')
              .min(1800, 'Введите корректный год')
              .max(3000, 'Введите корректный год')
              .required('Обязательное поле'),
          })}
          onSubmit={(values, actions) => {
            if (isEdit) {
              dispatch(updateCar(values));
            } else {
              dispatch(addCar(values));
            }

            closeModalCar();
          }}>
          {(props) => (
            <CarsForm
              isEdit={isEdit}
              closeModalCar={closeModalCar}
              {...props}
            />
          )}
        </Formik>
      </SModal>
    </ModalBox>
  );
}
