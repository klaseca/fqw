import React from 'react';

import {
  CabinetBox,
  CircleButton,
  CabinetBoxHeader,
  UnderHeaderLine,
} from 'components/Cabinet/Cabinet.sc';
import CarsBox from 'components/Cabinet/CarsBox';
import NoData from 'components/Cabinet/NoData';
import Add from 'assets/Icons/Add';

import { useSelector, useDispatch } from 'react-redux';
import { setModal } from 'store/cabinetSlice';

export default function CarsCard() {
  const { cars, carTitles } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const openModal = () => {
    dispatch(setModal({ name: 'isModalCars', isOpen: true }));
  };

  return (
    <CabinetBox item lg={10} xs={12}>
      <CabinetBoxHeader>
        Cars
        <UnderHeaderLine />
      </CabinetBoxHeader>
      {cars.length ? (
        <CarsBox cars={cars} carTitles={carTitles} />
      ) : (
        <NoData>Нет машин</NoData>
      )}
      <CircleButton onClick={openModal}><Add /></CircleButton>
    </CabinetBox>
  );
}
