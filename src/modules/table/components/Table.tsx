import React from 'react';
import { ITableItem } from '../../../models/table';
import TableItem from './TableItem';
import { AiOutlineCaretDown } from 'react-icons/ai';

interface Props {
  data: ITableItem[];
  sort(): void;
}

const Table = (props: Props) => {
  const { data, sort } = props;
  const [isRotate, setIsRotate] = React.useState(false);
  const handleRotahate = () => {
    setIsRotate(!isRotate);
  };
  return (
    <table className="table table-borderless">
      <thead>
        <th scope="col">Status</th>
        <th
          scope="col"
          onClick={() => {
            handleRotahate();
            sort();
          }}
          style={{ cursor: 'pointer' }}
        >
          Date
          <span>
            <AiOutlineCaretDown className={isRotate ? 'icon-rotate' : ''} />
          </span>
        </th>
        <th scope="col">Funding Method</th>
        <th scope="col">Payroll Currency</th>
        <th scope="col">Total</th>
        <th scope="col">Order #</th>
        <th scope="col"></th>
      </thead>
      <tbody>
        {data?.map((item, index) => {
          return <TableItem key={index} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
