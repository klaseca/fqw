import React from 'react';

import { ContentBox } from 'components/Cabinet/Cabinet.sc';

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useSelector, useDispatch } from 'react-redux';
import { handleDateChange, changeCar } from 'store/newOrderSlice';

export default function SelectDateAndCar() {
  const { date, carChanged } = useSelector((state) => state.newOrder);
  const { cars } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Grid item container>
      <ContentBox item xs={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <Grid container justify='space-around'>
            <KeyboardDatePicker
              style={{ width: '100%', margin: '0' }}
              autoOk={true}
              disableToolbar
              variant='inline'
              format='dd.MM.yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Дата посещения сто'
              minDate={new Date()}
              value={date}
              onChange={(date) => dispatch(handleDateChange(date.toString()))}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </ContentBox>

      <ContentBox item xs={6}>
        <FormControl>
          <InputLabel id={`car-label`}>Выберите машину</InputLabel>
          <Select
            value={carChanged}
            onChange={({ target: { value } }) => dispatch(changeCar(value))}
            labelId={`car-label`}
            id={`car-select`}>
            {cars.map(({ carId, brand, model, stateNumber }) => (
              <MenuItem key={carId} value={carId}>
                {`${brand} ${model} ${stateNumber}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ContentBox>
    </Grid>
  );
}
