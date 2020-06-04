import * as jsPDF from 'jspdf';
import { PTSans } from 'assets/Fonts/PTSans';
import { format } from 'date-fns';

export const createReport = (data) => {
  const report = new jsPDF();

  const rowStepper = () => {
    let row = 85;

    return {
      next() {
        return (row += 10);
      },
    };
  };

  const row = rowStepper();

  const dateToday = format(new Date(), 'dd.MM.yyyy');
  const dateStart = format(new Date(data.startDate), 'dd.MM.yyyy');
  const dateEnd = format(new Date(data.endDate), 'dd.MM.yyyy');
  const dateName = format(new Date(), 'dd.MM.yyyy_HH-mm-ss');

  report.addFileToVFS('assets/Fonts/PTSans-Regular.ttf', PTSans);
  report.addFont('assets/Fonts/PTSans-Regular.ttf', 'PTSans', 'normal');

  report.setFont('PTSans');
  report.setFontSize(40);
  report.text('Отчет', 105, 25, { align: 'center' });
  report.setFontSize(30);
  report.text('о использовании услуг', 105, 35, { align: 'center' });
  report.text('станции технического обсуживания', 105, 45, { align: 'center' });
  report.setFontSize(20);
  report.text('Компания ООО "Альтаир"', 110, 55, { align: 'left' });
  report.text(`Отчет создан ${dateToday}`, 110, 65, { align: 'left' });

  report.setFontSize(30);
  report.text(`Информация:`, 105, 80, { align: 'center' });
  report.setFontSize(20);
  report.text(`Начальная дата: ${dateStart}`, 15, row.next());
  report.text(`Конечная дата: ${dateEnd}`, 15, row.next());
  report.text(`Потрачено средств: ${data.price} р.`, 15, row.next());
  report.text(
    `Обслуженных автомобилей (к-во): ${data.carsCount}`,
    15,
    row.next()
  );
  report.text(`Список обслуженных автомобилей:`, 15, row.next());
  data.cars.forEach((car) => {
    report.text(`- ${car}`, 25, row.next());
  });
  report.text(`Заказов (к-во): ${data.ordersCount}`, 15, row.next());
  report.text(
    `Использовано услуг (к-во): ${data.servicesCount}`,
    15,
    row.next()
  );
  report.text(`Список использованных услуг:`, 15, row.next());
  data.services.forEach((service) => {
    report.text(`- ${service}`, 25, row.next());
  });
  report.text(
    `Использовано видов услуг (к-во): ${data.tosCount}`,
    15,
    row.next()
  );
  report.text(`Список использованных видов услуг:`, 15, row.next());
  data.tos.forEach((to) => {
    report.text(`- ${to}`, 25, row.next());
  });

  report.save(`report_${dateName}.pdf`);
};
