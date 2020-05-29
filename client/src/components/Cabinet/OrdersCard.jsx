import React from 'react';

import {
  CabinetBox,
  CircleButton,
  CabinetBoxHeader,
  UnderHeaderLine,
} from 'components/Cabinet/Cabinet.sc';

import OrdersBox from 'components/Cabinet/OrdersBox';
import NoData from 'components/Cabinet/NoData';
import List from 'assets/Icons/List';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

export default function OrdersCard() {
  const { orders, orderTitles } = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <CabinetBox item lg={10} xs={12}>
      <CabinetBoxHeader>
        Заказы
        <UnderHeaderLine />
      </CabinetBoxHeader>
      {orders.length ? (
        <OrdersBox orders={orders} orderTitles={orderTitles} />
      ) : (
        <NoData>Нет заказов</NoData>
      )}
      <CircleButton onClick={() => history.push('/myorders')}>
        <List />
      </CircleButton>
    </CabinetBox>
  );
}
