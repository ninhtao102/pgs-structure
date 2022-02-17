import React from 'react';
import { useSelector } from 'react-redux';
import { Iitem } from '../../../models/list';
import { AppState } from '../../../redux/reducer';
import Item from './Item';

interface Props {
  loading?: boolean;
  errorMessage?: string;
  listItem?: Iitem[];
}

const ListItem = (props: Props) => {
  const { listItem } = props;
  console.log(listItem);

  return (
    <div style={{}}>
      <div>
        {listItem?.map((item, index) => {
          return (
            <div className="" key={index}>
              <Item item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListItem;
