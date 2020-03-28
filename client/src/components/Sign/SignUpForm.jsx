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
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
      passConfirm: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .min(2, 'Min 2')
        .required('Required'),
      lastName: Yup.string()
        .trim()
        .min(2, 'Min 2')
        .required('Required'),
      email: Yup.string()
        .trim()
        .email('Invalid email address')
        .required('Required'),
      pass: Yup.string()
        .trim()
        .min(6, 'Min 6 symols')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      passConfirm: Yup.string()
        .trim()
        .min(6, 'Min 6 symols')
        .max(20, 'Must be 20 characters or less')
        .required('Required')
        .oneOf([Yup.ref('pass')], 'Password does not match')
    }),
    onSubmit(values) {
      console.log(values);
    }
  });

  const otherInfo = {
    firstName: {
      name: 'Имя',
      type: 'text'
    },
    lastName: {
      name: 'Фамилия',
      type: 'text'
    },
    email: {
      name: 'Почта',
      type: 'email'
    },
    pass: {
      name: 'Пароль',
      type: 'password'
    },
    passConfirm: {
      name: 'Повторите пароль',
      type: 'password'
    }
  };

  const keys = Object.keys(formik.values);

  return (
    <SignBox>
      <FormBox>
        <FormTitle>Регистрация</FormTitle>
        <Form onSubmit={formik.handleSubmit}>
          {keys.map(key => (
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
        </Form>
      </FormBox>
      <UnderFormText>
        Есть аккаунт? <SLink to='/signin'>Авторизоваться</SLink>
      </UnderFormText>
    </SignBox>
  );
}
