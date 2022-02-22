import React, { memo } from 'react';
import dayjs from 'dayjs';
import { ITableItem } from '../../../models/table';

interface Props {
  item: ITableItem;
}

const TableItem = (props: Props) => {
  const { item } = props;
  return (
    <tr className="table-row py-2">
      <td scope="row">{item.status}</td>
      <td>{dayjs(item.time_created).format('DD/MM/YYYY')}</td>
      <td>{item.payment_type}</td>
      <td>{item.currency}</td>
      <td>{item.volume_input_in_input_currency}</td>
      <td>{item.payroll_id}</td>
      <td></td>
    </tr>
  );
};

export default memo(TableItem);
