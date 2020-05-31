import React from 'react';

import { SPreloaderBox } from 'components/Common/StyledComponents';

import Preloader from 'assets/Icons/Preloader';

export default function PreloaderBox() {
  return (
    <SPreloaderBox>
      <Preloader />
    </SPreloaderBox>
  );
}
