import React from 'react';

import ProfileModal from 'components/Cabinet/ProfileModal';
import CarsModal from 'components/Cabinet/CarsModal';
import DeleteModal from 'components/Cabinet/DeleteModal';
import OrderModal from 'components/Cabinet/OrderModal';

import { useSelector } from 'react-redux';

export default function CabinetModal() {
  const {
    isModalProfile,
    isModalCars,
    isModalDelete,
    isModalOrder,
  } = useSelector((state) => state.cabinet);

  return (
    <>
      {isModalProfile && <ProfileModal />}
      {isModalCars && <CarsModal />}
      {isModalDelete && <DeleteModal />}
      {isModalOrder && <OrderModal />}
    </>
  );
}
