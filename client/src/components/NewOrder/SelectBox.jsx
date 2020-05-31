import React from 'react';

import { ContentBox } from 'components/Cabinet/Cabinet.sc';

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { changeOrderItem, deleteOrderItem } from 'store/newOrderSlice';

export default function SelectBox() {
  const { services, orderItems } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();

  const isDelete = orderItems.length > 1 ? false : true;

  return (
    <>
      {orderItems.map((item) => (
        <Grid item container key={item.id}>
          <ContentBox item xs={5}>
            <FormControl>
              <InputLabel id={`${item.id}-label`}>Услуга</InputLabel>
              <Select
                value={item.serviceId}
                onChange={({ target: { value } }) =>
                  dispatch(
                    changeOrderItem({
                      value,
                      id: item.id,
                      isChangeServiseId: true,
                    })
                  )
                }
                labelId={`${item.id}-label`}
                id={`${item.id}-select`}>
                {services.map(({ serviceId, title }) => (
                  <MenuItem key={serviceId} value={serviceId}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ContentBox>

          <ContentBox item xs={5}>
            <FormControl>
              <InputLabel id={`${item.id}-label2`}>Вид услуги</InputLabel>
              <Select
                value={item.typeOfServices}
                onChange={({ target: { value } }) =>
                  dispatch(
                    changeOrderItem({
                      value,
                      id: item.id,
                      isChangeServiseId: false,
                    })
                  )
                }
                multiple
                disabled={!Boolean(item.serviceId)}
                labelId={`${item.id}-label2`}
                id={`${item.id}-select2`}>
                {services
                  .find((service) => service.serviceId === item.serviceId)
                  ?.typeOfServices.map(({ typeOfServiceId, title }) => (
                    <MenuItem key={typeOfServiceId} value={typeOfServiceId}>
                      {title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ContentBox>

          <ContentBox container alignItems='center' item xs={2}>
            <Button
              disabled={isDelete}
              onClick={() => dispatch(deleteOrderItem(item.id))}>
              Удалить
            </Button>
          </ContentBox>
        </Grid>
      ))}
    </>
  );
}
