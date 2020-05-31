import React from 'react'

function Preloader() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='135'
      height='140'
      fill='#fff'
      viewBox='0 0 135 140'
    >
      <rect width='15' height='105.224' y='17.388' rx='6'>
        <animate
          attributeName='height'
          begin='0.5s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='120;110;100;90;80;70;60;50;40;140;120'
        ></animate>
        <animate
          attributeName='y'
          begin='0.5s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='10;15;20;25;30;35;40;45;50;0;10'
        ></animate>
      </rect>
      <rect width='15' height='80.224' x='30' y='29.888' rx='6'>
        <animate
          attributeName='height'
          begin='0.25s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='120;110;100;90;80;70;60;50;40;140;120'
        ></animate>
        <animate
          attributeName='y'
          begin='0.25s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='10;15;20;25;30;35;40;45;50;0;10'
        ></animate>
      </rect>
      <rect width='15' height='55.224' x='60' y='42.388' rx='6'>
        <animate
          attributeName='height'
          begin='0s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='120;110;100;90;80;70;60;50;40;140;120'
        ></animate>
        <animate
          attributeName='y'
          begin='0s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='10;15;20;25;30;35;40;45;50;0;10'
        ></animate>
      </rect>
      <rect width='15' height='80.224' x='90' y='29.888' rx='6'>
        <animate
          attributeName='height'
          begin='0.25s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='120;110;100;90;80;70;60;50;40;140;120'
        ></animate>
        <animate
          attributeName='y'
          begin='0.25s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='10;15;20;25;30;35;40;45;50;0;10'
        ></animate>
      </rect>
      <rect width='15' height='105.224' x='120' y='17.388' rx='6'>
        <animate
          attributeName='height'
          begin='0.5s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='120;110;100;90;80;70;60;50;40;140;120'
        ></animate>
        <animate
          attributeName='y'
          begin='0.5s'
          calcMode='linear'
          dur='1s'
          repeatCount='indefinite'
          values='10;15;20;25;30;35;40;45;50;0;10'
        ></animate>
      </rect>
    </svg>
  );
}

export default Preloader;
