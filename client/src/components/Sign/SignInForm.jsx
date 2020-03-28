import React from 'react';

import {
  SignBox,
  FormBox,
  FormTitle,
  Form,
  STextField,
  UnderFormText,
  SLink
} from './Sign.sc';
import { Button } from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      pass: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Invalid email address')
        .required('Required'),
      pass: Yup.string()
        .trim()
        .min(6, 'Min 6 symols')
        .max(20, 'Must be 20 characters or less')
        .required('Required')
    }),
    onSubmit(values) {
      console.log(values);
    }
  });

  console.log(formik.values);

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
            name='pass'
            label='Пароль'
            type='password'
            {...formik.getFieldProps('pass')}
            error={Boolean(formik.touched.pass && formik.errors.pass)}
            helperText={
              formik.errors.pass &&
              formik.touched.pass &&
              String(formik.errors.pass)
            }
          />
          <Button type='submit'>Войти</Button>
        </Form>
      </FormBox>
      <UnderFormText>
        Нет аккаунта? <SLink to='/signup'>Зарегистрировать</SLink>
      </UnderFormText>
    </SignBox>
  );
}
