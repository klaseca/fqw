import React from 'react';

import { Grid, TextField, Button } from '@material-ui/core';

import { ContentBox } from 'components/Cabinet/Cabinet.sc';

export default function ProfileForm({
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  errors,
  touched,
  closeModalProfile,
}) {
  const formData = [
    {
      name: 'firstName',
      label: 'Имя',
    },
    {
      name: 'lastName',
      label: 'Фамилия',
    },
    {
      name: 'email',
      label: 'Почта',
    },
    {
      name: 'phone',
      label: 'Телефон',
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        {formData.map((item) => (
          <ContentBox item sm={6} xs={12} key={item.name}>
            <TextField
              name={item.name}
              label={item.label}
              value={values[item.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched[item.name] && errors[item.name])}
              helperText={
                errors[item.name] &&
                touched[item.name] &&
                String(errors[item.name])
              }
            />
          </ContentBox>
        ))}
        
        <Grid item sm={12} container justify='center'>
          <Button color='primary' type='submit'>
            Сохранить
          </Button>
          <Button color='primary' onClick={closeModalProfile}>
            Отмена
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
