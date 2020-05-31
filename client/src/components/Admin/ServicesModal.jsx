import React, { useState } from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import {
  ModalBox,
  CabinetBox,
  ContentBox,
} from 'components/Cabinet/Cabinet.sc';

import { useSelector, useDispatch } from 'react-redux';
import { setModal, setService } from 'store/adminSlice';
import { updateServices } from 'store/servicesSlice';
import { useMountEffect } from 'hooks/useMountEffect';

import * as Yup from 'yup';

export default function ServicesModal() {
  const { isModal, service } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [serviceTitle, setServiceTitle] = useState(service.title);
  const [serviceDescription, setServiceDescription] = useState(
    service.description
  );
  const [typeOfServices, setTypeOfServices] = useState(service.typeOfServices);

  const changeServiceTitle = ({ target: { value } }) => setServiceTitle(value);
  const changeServiceDescription = ({ target: { value } }) =>
    setServiceDescription(value);
  const changeTypeOfServices = ({ target: { value } }, id, name) => {
    const index = typeOfServices.findIndex((tof) => tof.typeOfServiceId === id);
    const tofs = [...typeOfServices];
    tofs[index] = {
      ...tofs[index],
      [name]: value,
    };
    setTypeOfServices(tofs);
  };
  const deleteTypeOfService = (id) => {
    const tofs = typeOfServices.filter((tof) => tof.typeOfServiceId !== id);
    setTypeOfServices(tofs);
  };
  const addTypeOfService = () => {
    const tof = {
      typeOfServiceId: `f${(+new Date()).toString(16)}`,
      title: '',
      description: '',
      price: '',
      serviceId: service.serviceId,
    };
    setTypeOfServices([...typeOfServices, tof]);
  };

  const isDelete = typeOfServices.length > 1 ? false : true;

  const closeModal = () => {
    dispatch(setModal({ name: 'isModal', isOpen: false }));
  };

  const defaulErrors = {
    serviceTitle: {
      isError: false,
      message: '',
    },
    serviceDescription: {
      isError: false,
      message: '',
    },
  };

  const [errors, setErrors] = useState({ ...defaulErrors });

  const validate = async () => {
    const schema = Yup.object().shape({
      serviceTitle: Yup.string().trim().required('Обязательное поле'),
      serviceDescription: Yup.string().trim().required('Обязательное поле'),
      typeOfServices: Yup.array(
        Yup.object({
          typeOfServiceId: Yup.string().trim().required(),
          title: Yup.string().trim().required('Обязательное поле'),
          price: Yup.number()
            .typeError('Только цифры')
            .positive('Введите положительное число')
            .required('Обязательное поле'),
          description: Yup.string().trim().required('Обязательное поле'),
        })
      )
        .min(1)
        .required(),
    });

    try {
      await schema.validate(
        {
          serviceTitle,
          serviceDescription,
          typeOfServices,
        },
        { abortEarly: false }
      );
      return true;
    } catch (error) {
      console.log(error.inner);
      const errs = error.inner.map((err) => {
        const isArr = err.path.replace(/[^0-9]/g, '')[0];
        if (isArr) {
          const name = err.path.split('.')[1];
          return {
            [isArr]: { [name]: { isError: true, message: err.message } },
          };
        } else {
          return { [err.path]: { isError: true, message: err.message } };
        }
      });

      const merge = (...arg) => {
        const target = {};
        const merger = (obj) => {
          for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              if (
                Object.prototype.toString.call(obj[prop]) === '[object Object]'
              ) {
                target[prop] = merge(target[prop], obj[prop]);
              } else {
                target[prop] = obj[prop];
              }
            }
          }
        };
        for (let i = 0; i < arg.length; i++) {
          merger(arg[i]);
        }
        return target;
      };
      const a = merge(...errs);

      setErrors({ ...defaulErrors, ...a });

      return false;
    }
  };

  const saveData = async () => {
    const isValid = await validate();
    if (isValid) {
      const oldTofs = service.typeOfServices.map((tof) => tof.typeOfServiceId);
      const newTofs = new Set(typeOfServices.map((tof) => tof.typeOfServiceId));
      const delTypeOfServices = new Set(
        [...oldTofs].filter((x) => !newTofs.has(x))
      );
      dispatch(updateServices(createOptions([...delTypeOfServices])));
      closeModal();
    }
  };

  const createOptions = (delTypeOfServices) => ({
    service: {
      serviceId: service.serviceId || `f${(+new Date()).toString(16)}`,
      title: serviceTitle,
      description: serviceDescription,
    },
    typeOfServices,
    delTypeOfServices,
  });

  useMountEffect(() => {
    if (typeOfServices.length === 0) addTypeOfService();

    return () =>
      dispatch(
        setService({
          title: '',
          description: '',
          typeOfServices: [],
        })
      );
  });

  return (
    <ModalBox
      open={isModal}
      onClose={closeModal}
      aria-labelledby='simple-modal-title'>
      <CabinetBox
        item
        xs={10}
        style={{ outline: 'none', maxHeight: '90vh', overflowY: 'auto' }}>
        <Grid container>
          <ContentBox item xs={6}>
            <TextField
              label='Название услуги'
              value={serviceTitle}
              onChange={changeServiceTitle}
              error={errors.serviceTitle.isError}
              helperText={errors.serviceTitle.message}
            />
          </ContentBox>
          <ContentBox item xs={6}>
            <TextField
              multiline
              label='Описание'
              value={serviceDescription}
              onChange={changeServiceDescription}
              error={errors.serviceDescription.isError}
              helperText={errors.serviceDescription.message}
            />
          </ContentBox>
        </Grid>
        {typeOfServices.map((tof, i) => (
          <Grid container key={tof.typeOfServiceId}>
            <ContentBox item xs={4}>
              <TextField
                label='Вид услуги'
                value={tof.title}
                onChange={(e) =>
                  changeTypeOfServices(e, tof.typeOfServiceId, 'title')
                }
                error={errors[i]?.title?.isError}
                helperText={errors[i]?.title?.message}
              />
            </ContentBox>
            <ContentBox item xs={2}>
              <TextField
                label='Цена'
                value={tof.price}
                onChange={(e) =>
                  changeTypeOfServices(e, tof.typeOfServiceId, 'price')
                }
                error={errors[i]?.price?.isError}
                helperText={errors[i]?.price?.message}
              />
            </ContentBox>
            <ContentBox item xs={4}>
              <TextField
                multiline
                label='Описание'
                value={tof.description}
                onChange={(e) =>
                  changeTypeOfServices(e, tof.typeOfServiceId, 'description')
                }
                error={errors[i]?.description?.isError}
                helperText={errors[i]?.description?.message}
              />
            </ContentBox>
            <ContentBox item xs={2} container justify='center'>
              <Button
                disabled={isDelete}
                onClick={() => deleteTypeOfService(tof.typeOfServiceId)}>
                Удалить
              </Button>
            </ContentBox>
          </Grid>
        ))}
        <Grid container justify='space-around'>
          <Button onClick={addTypeOfService}>Добавить вид услуги</Button>
          <Button onClick={saveData}>Сохранить</Button>
          <Button onClick={closeModal}>Отмена</Button>
        </Grid>
      </CabinetBox>
    </ModalBox>
  );
}
