import React from 'react';

import HeadSection from 'components/Main/HeadSection';
import WhyMe from 'components/Main/WhyWe/WhyWe';

import {styled} from '@material-ui/core';

const Article = styled('article')({
  flex: '1'
});

export default function Main() {
  return (
    <Article>
      <HeadSection />
      <WhyMe />
    </Article>
  )
}
