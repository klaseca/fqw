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
import { STooltip } from 'components/Common/StyledComponents';

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
        Автомобили
        <UnderHeaderLine />
      </CabinetBoxHeader>
      {cars.length ? (
        <CarsBox cars={cars} carTitles={carTitles} />
      ) : (
        <NoData>Нет машин</NoData>
      )}
      <STooltip title='Добавить автомобиль' placement='left'>
        <CircleButton onClick={openModal}>
          <Add />
        </CircleButton>
      </STooltip>
    </CabinetBox>
  );
}
