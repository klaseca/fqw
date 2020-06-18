import React from 'react';

import { ContentBox } from 'components/Cabinet/Cabinet.sc';

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useDispatch } from 'react-redux';
import { getReportData } from 'store/cabinetSlice';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <KeyboardDatePicker
      style={{ width: '100%', margin: '0' }}
      autoOk={true}
      disableToolbar
      variant='inline'
      format='dd.MM.yyyy'
      margin='normal'
      id='endDate'
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      name={field.name}
      value={field.value}
      helperText={currentError}
      error={Boolean(currentError)}
      onChange={(date) => form.setFieldValue(field.name, date, true)}
      {...other}
    />
  );
};

const FormikSelect = ({ field, form, children, ...other }) => {
  return (
    <Select
      multiple
      name={field.name}
      value={field.value}
      onChange={({ target: { value } }) =>
        form.setFieldValue(field.name, value, true)
      }
      labelId={`car-label`}
      id={`car-select`}
      {...other}>
      {children}
    </Select>
  );
};

export default function ReportFormBox({ cars, orders }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        startDate: new Date(),
        endDate: new Date(),
        carId: [],
      }}
      validationSchema={Yup.object({
        startDate: Yup.date()
          .max(
            Yup.ref('endDate'),
            'Начальная дата должна начинаться раньше, чем конечная'
          )
          .required('Обязательное поле'),
        endDate: Yup.date()
          .max(new Date(), 'Конечная дата не может быть позже сегодняшнего дня')
          .required('Обязательное поле'),
        carId: Yup.array(Yup.number()).required('Обязательное поле'),
      })}
      onSubmit={async (values) => {
        dispatch(getReportData(values));
      }}>
      {(formik) => (
        <Form>
          <Grid container>
            <ContentBox item xs={12} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <Grid container justify='space-around'>
                  <Field
                    label='Начальная дата'
                    name='startDate'
                    component={DatePickerField}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </ContentBox>
            <ContentBox item xs={12} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <Grid container justify='space-around'>
                  <Field
                    label='Конечная дата'
                    name='endDate'
                    component={DatePickerField}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </ContentBox>
            <ContentBox item xs={12} md={6}>
              <FormControl
                error={Boolean(formik.touched.carId && formik.errors.carId)}>
                <InputLabel id={`car-label`}>Выберите машину</InputLabel>
                <Field id='car-label' name='carId' component={FormikSelect}>
                  {cars.map(({ carId, brand, model, stateNumber }) => (
                    <MenuItem key={carId} value={carId}>
                      {`${brand} ${model} ${stateNumber}`}
                    </MenuItem>
                  ))}
                </Field>
                {formik.touched.carId && formik.errors.carId && (
                  <FormHelperText>
                    Необходимо выбрать минимум один автомобиль
                  </FormHelperText>
                )}
              </FormControl>
            </ContentBox>
            <Grid container justify='center'>
              <Button type='submit'>Сформировать отчет</Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
