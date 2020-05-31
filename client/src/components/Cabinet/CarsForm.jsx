import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { ContentBox } from 'components/Cabinet/Cabinet.sc';

export default function CarsForm({
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  errors,
  touched,
  closeModalCar,
  isEdit,
}) {
  const formData = [
    {
      name: 'brand',
      label: 'Марка',
    },
    {
      name: 'model',
      label: 'Модель',
    },
    {
      name: 'stateNumber',
      label: 'Гос. номер',
    },
    {
      name: 'yearOfIssue',
      label: 'Год выпуска',
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
              helperText={errors[item.name] && touched[item.name] && String(errors[item.name])}
            />
          </ContentBox>
        ))}
        <Grid item sm={12} container justify='center'>
          <Button color='primary' type='submit'>
            {isEdit ? 'Сохранить' : 'Добавить'}
          </Button>
          <Button color='primary' onClick={closeModalCar}>
            Отмена
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
