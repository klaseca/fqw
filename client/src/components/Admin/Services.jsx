import React from 'react';

import { Grid, Button } from '@material-ui/core';
import ExpansionBox from 'components/Services/ExpansionBox';

import {
  CabinetBox,
  CabinetBoxHeader,
  UnderHeaderLine,
  ContentBox,
} from 'components/Cabinet/Cabinet.sc';
import { Paragraph, AddButton } from 'components/Services/Services.sc';
import Add from 'assets/Icons/Add';
import ServicesModal from 'components/Admin/ServicesModal';
import { STooltip } from 'components/Common/StyledComponents';

import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from 'store/servicesSlice';
import { setService, setModal } from 'store/adminSlice';
import { useMountEffect } from 'hooks/useMountEffect';

export default function Services() {
  const { services } = useSelector((state) => state.services);
  const { isModal } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useMountEffect(() => {
    dispatch(fetchServices());
  });

  const openModalEdit = (service) => {
    dispatch(setService(service));
    dispatch(setModal({ name: 'isModal', isOpen: true }));
  };

  const openModalAdd = () => {
    dispatch(setModal({ name: 'isModal', isOpen: true }));
  };

  return (
    <Grid container justify='center'>
      {services.length === 0 && (
        <div style={{ fontSize: '2em' }}>Услуг не найдено</div>
      )}
      {services.map((service) => (
        <CabinetBox item xs={12} key={service.serviceId}>
          <CabinetBoxHeader>
            {service.title}
            <UnderHeaderLine />
          </CabinetBoxHeader>
          <Grid container>
            <ContentBox item xs={12}>
              <Paragraph>{service.description}</Paragraph>
              <ExpansionBox typeOfServices={service.typeOfServices} />
            </ContentBox>
          </Grid>
          <Grid container justify='center'>
            <Button
              variant='contained'
              color='primary'
              onClick={() => openModalEdit(service)}>
              Редактировать
            </Button>
          </Grid>
        </CabinetBox>
      ))}
      <STooltip title='Новая услуга' placement='left'>
        <AddButton onClick={openModalAdd}>
          <Add />
        </AddButton>
      </STooltip>
      {isModal && <ServicesModal />}
    </Grid>
  );
}
