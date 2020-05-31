import React from 'react';

import {
  Article,
  SContainer,
  STooltip,
} from 'components/Common/StyledComponents';

import { Title, Paragraph, AddButton } from 'components/Services/Services.sc';
import ExpansionBox from 'components/Services/ExpansionBox';

import {
  CabinetBox,
  CabinetBoxHeader,
  UnderHeaderLine,
  ContentBox,
} from 'components/Cabinet/Cabinet.sc';

import { Grid } from '@material-ui/core';

import Add from 'assets/Icons/Add';

import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from 'store/servicesSlice';
import { useMountEffect } from 'hooks/useMountEffect';

import { useHistory } from 'react-router-dom';

export default function Services() {
  const { services } = useSelector((state) => state.services);
  const { isAuth } = useSelector((state) => state.user);
  const { isAuth: isAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const history = useHistory();

  const redirect = () => {
    if (isAuth) {
      history.push('/neworder');
    } else {
      history.push('/signin');
    }
  };

  useMountEffect(() => {
    dispatch(fetchServices());
  });

  return (
    <Article>
      <SContainer maxWidth='lg'>
        <Grid container direction='column' alignItems='center'>
          <Title>Услуги</Title>
          <Grid container justify='center'>
            {services.map((service) => (
              <CabinetBox item lg={10} xs={12} key={service.serviceId}>
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
              </CabinetBox>
            ))}
          </Grid>
        </Grid>
      </SContainer>
      {!isAdmin && (
        <STooltip title='Новый заказ' placement='left'>
          <AddButton onClick={redirect}>
            <Add />
          </AddButton>
        </STooltip>
      )}
    </Article>
  );
}
