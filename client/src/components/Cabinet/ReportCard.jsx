import React, { useEffect } from 'react';

import {
  CabinetBox,
  Square,
  CabinetBoxHeader,
  UnderHeaderLine,
  WarningBox,
} from 'components/Cabinet/Cabinet.sc';
import ReportFormBox from 'components/Cabinet/ReportFormBox';
import Question from 'assets/Icons/Question';
import { STooltip } from 'components/Common/StyledComponents';
import NoData from 'components/Cabinet/NoData';

import { useSelector, useDispatch } from 'react-redux';
import { resetReportInfo } from 'store/cabinetSlice';

import { createReport } from 'utils/reportCreator';

export default function ReportCard() {
  const { cars, orders } = useSelector((state) => state.user);
  const {
    reportInfo: { isFulfield, message, reportData },
  } = useSelector((state) => state.cabinet);
  const dispatch = useDispatch();

  const isDisableReport = cars.length && orders.length ? false : true;

  useEffect(() => {
    message && setTimeout(() => dispatch(resetReportInfo()), 5000);
    if (
      !(
        Object.keys(reportData).length === 0 &&
        reportData.constructor === Object
      )
    ) {
      createReport(reportData);
    }
  }, [message, reportData, dispatch]);

  return (
    <CabinetBox item lg={10} xs={12}>
      <CabinetBoxHeader>
        Отчеты
        <UnderHeaderLine />
      </CabinetBoxHeader>
      {!isDisableReport ? (
        <ReportFormBox cars={cars} orders={orders} />
      ) : (
        <NoData>
          Для создания отчета требуется минимум один автомобиль и минимум один
          заказ
        </NoData>
      )}
      {isFulfield && message && (
        <WarningBox container>{message}</WarningBox>
      )}
      <STooltip
        title='В отчет включаются только завершенные заказы'
        placement='left'>
        <Square>
          <Question />
        </Square>
      </STooltip>
    </CabinetBox>
  );
}
