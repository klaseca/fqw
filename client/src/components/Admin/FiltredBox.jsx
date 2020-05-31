import React, { useState } from 'react';

import { Grid, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

import {
  SFiltredBox,
  FilterTitle,
  SFormControl,
  FilterBox,
} from 'components/Admin/Admin.sc';

import { useDispatch } from 'react-redux';
import { getOrders } from 'store/adminSlice';

export default function FiltredBox() {
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState(1);

  const handleChange = ({ target: { value } }) => {
    setOrderType(value);
  };

  const getOptions = (index) => {
    const options = {
      1: { dateStart: new Date() },
      2: { statusId: 1 },
      3: { statusId: 2 },
      4: { statusId: 3 },
      5: { statusId: 4 },
    };

    return options[index];
  };

  return (
    <SFiltredBox container>
      <FilterTitle>Заказы:</FilterTitle>
      <Grid>
        <SFormControl>
          <InputLabel id='demo-simple-select-label'>Тип заказов</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={orderType}
            onChange={handleChange}>
            <MenuItem value={1}>На сегодня</MenuItem>
            <MenuItem value={2}>В ожидании автомобиля</MenuItem>
            <MenuItem value={3}>В процессе выполнения</MenuItem>
            <MenuItem value={4}>Выполнен. Автомобиль ожидает клиента</MenuItem>
            <MenuItem value={5}>Завершен</MenuItem>
          </Select>
        </SFormControl>
      </Grid>
      <FilterBox>
        <Button onClick={() => dispatch(getOrders(getOptions(orderType)))}>
          Показать
        </Button>
      </FilterBox>
    </SFiltredBox>
  );
}
