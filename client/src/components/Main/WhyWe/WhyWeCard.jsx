import React from 'react';

import Engineer from 'assets/Icons/Engineer';
import Money from 'assets/Icons/Money';
import Cabinet from 'assets/Icons/Cabinet';
import Equip from 'assets/Icons/Equip';

import { styled } from '@material-ui/core/styles';

const Card = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '15vmin',
  backgroundColor: '#ececec',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
});

const Title = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '10px',
  fontSize: '2em',
  textAlign: 'center',
});

const IconBox = styled('div')({
  display: 'flex',
  minHeight: '50px',
});

export default function WhyWeCard({ title, icon }) {
  return (
    <Card>
      <IconBox>
        {icon === 'Engineer' && <Engineer />}
        {icon === 'Money' && <Money />}
        {icon === 'Cabinet' && <Cabinet />}
        {icon === 'Equip' && <Equip />}
      </IconBox>
      <Title>{title}</Title>
    </Card>
  );
}
