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
  const { error: { isError, message } } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .trim()
        .min(6, 'Min 6 symols')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    async onSubmit(values) {
      dispatch(fetchUser({ path: '/login', values }));
    }
  });

  useMountEffect(() => () => dispatch(resetError()));

  return (
    <SignBox>
      <FormBox>
        <FormTitle>Вход</FormTitle>
        <Form onSubmit={formik.handleSubmit}>
          <STextField
            name='email'
            label='Почта'
            {...formik.getFieldProps('email')}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={
              formik.errors.email &&
              formik.touched.email &&
              String(formik.errors.email)
            }
          />
          <STextField
            name='password'
            label='Пароль'
            type='password'
            {...formik.getFieldProps('password')}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={
              formik.errors.password &&
              formik.touched.password &&
              String(formik.errors.password)
            }
          />
          <Button type='submit'>Войти</Button>
          {isError && (
            <ErrorBox>{message}</ErrorBox>
          )}
        </Form>
      </FormBox>
      <UnderFormText>
        Нет аккаунта? <SLink to='/signup'>Зарегистрировать</SLink>
      </UnderFormText>
    </SignBox>
  );
}
