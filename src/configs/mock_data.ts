import { LIST_PAYROLL } from '../data/mock_data';

export const mockData = LIST_PAYROLL.payrolls.map((item) => {
  if (item.date_fulfilled) {
    return { ...item, status: 'Fulfilled', color: '#38b000' };
  } else if (item.date_processed) {
    return { ...item, status: 'Processed', color: '#ffc300' };
  } else if (item.date_received) {
    return { ...item, status: 'Received', color: '#219ebc' };
  } else if (item.date_canceled) {
    return { ...item, status: 'Canceled', color: '#d00000' };
  } else return { ...item, status: 'Pending', color: '#2f4159' };
});
