import React from 'react';

import {
  SignBox,
  FormBox,
  FormTitle,
  Form,
  STextField,
} from './Sign.sc';
import { Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { loginAdmin } from 'store/adminSlice';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignForm() {
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
      dispatch(loginAdmin(values));
    }
  });

  return (
    <SignBox>
      <FormBox>
        <FormTitle>Админ. панель. Вход</FormTitle>
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
        </Form>
      </FormBox>
    </SignBox>
  );
}
