import dayjs from 'dayjs';
import React, { memo } from 'react';
import { ITableItem } from '../../../models/table';
import ModalDelete from './ModalDelete';
import ModalDetail from './ModalDetail';

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
      <td>{(item.volume_input_in_input_currency + item.fees).toFixed(2)}</td>
      <td>{item.payroll_id}</td>
      <td className="d-flex justify-content-around" style={{ padding: 'auto' }}>
        <ModalDetail item={item} />
        <ModalDelete item={item} />
      </td>
    </tr>
  );
};

export default memo(TableItem);
