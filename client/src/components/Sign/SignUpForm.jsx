import React from 'react';

import {
  SignBox,
  FormBox,
  FormTitle,
  Form,
  STextField,
  UnderFormText,
  SLink,
  ErrorBox,
} from './Sign.sc';
import { Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, resetError } from 'store/userSlice';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMountEffect } from 'hooks/useMountEffect';

export default function SignForm() {
  const {
    error: { isError, message },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useMountEffect(() => () => dispatch(resetError()));

  const phoneRegExp = /^([\\+]7|8?)?[-\s\\.]?9[0-9]{2}[-\s\\.]?[0-9]{7}$/gim;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      passConfirm: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .min(2, 'Поле должно содержать минимум 2 символова')
        .required('Обязательное поле'),
      lastName: Yup.string()
        .trim()
        .min(2, 'Поле должно содержать минимум 2 символова')
        .required('Обязательное поле'),
      email: Yup.string()
        .trim()
        .email('Некорректная почта')
        .required('Обязательное поле'),
      phone: Yup.string()
        .trim()
        .matches(phoneRegExp, 'Некорректный номер телефона')
        .required('Обязательное поле'),
      password: Yup.string()
        .trim()
        .min(6, 'Пароль должен содержать более 6 символов')
        .max(20, 'Пароль должен содержать менее 20 символов')
        .required('Обязательное поле'),
      passConfirm: Yup.string()
        .trim()
        .required('Обязательное поле')
        .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
    }),
    async onSubmit(values) {
      dispatch(fetchUser({ path: '/register', values }));
    },
  });

  const otherInfo = {
    firstName: {
      name: 'Имя',
      type: 'text',
    },
    lastName: {
      name: 'Фамилия',
      type: 'text',
    },
    email: {
      name: 'Почта',
      type: 'email',
    },
    phone: {
      name: 'Телефон',
      type: 'text',
    },
    password: {
      name: 'Пароль',
      type: 'password',
    },
    passConfirm: {
      name: 'Повторите пароль',
      type: 'password',
    },
  };

  const keys = Object.keys(formik.values);

  return (
    <SignBox>
      <FormBox>
        <FormTitle>Регистрация</FormTitle>
        <Form onSubmit={formik.handleSubmit}>
          {keys.map((key) => (
            <STextField
              key={key}
              name={key}
              label={otherInfo[key].name}
              type={otherInfo[key].type}
              {...formik.getFieldProps(key)}
              error={Boolean(formik.touched[key] && formik.errors[key])}
              helperText={
                formik.errors[key] &&
                formik.touched[key] &&
                String(formik.errors[key])
              }
            />
          ))}
          <Button type='submit'>Зарегистрироваться</Button>
          {isError && <ErrorBox>{message}</ErrorBox>}
        </Form>
      </FormBox>
      <UnderFormText>
        Есть аккаунт? <SLink to='/signin'>Авторизоваться</SLink>
      </UnderFormText>
    </SignBox>
  );
}
