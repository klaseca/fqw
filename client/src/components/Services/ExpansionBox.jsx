import React from 'react';

import {
  SExpansionBox,
  SExpansionPanel,
  SExpansionPanelSummary,
  SExpansionPanelDetails,
  Description,
  PriceBox,
} from 'components/Services/Services.sc';

import { Typography } from '@material-ui/core';

export default function ExpansionBox({ typeOfServices }) {
  return (
    <SExpansionBox>
      {typeOfServices.map((typeOfService) => (
        <SExpansionPanel key={typeOfService.typeOfServiceId}>
          <SExpansionPanelSummary
            aria-controls={`${typeOfService.typeOfServiceId}-content`}
            id={`${typeOfService.typeOfServiceId}-header`}>
            <Typography>{typeOfService.title}</Typography>
          </SExpansionPanelSummary>
          <SExpansionPanelDetails>
            <Description>{typeOfService.description}</Description>
            <PriceBox>{`Ориентировочная стоимость: ${typeOfService.price} р.`}</PriceBox>
          </SExpansionPanelDetails>
        </SExpansionPanel>
      ))}
    </SExpansionBox>
  );
}
