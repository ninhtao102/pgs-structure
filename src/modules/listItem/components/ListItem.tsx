import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import Item from './Item';

interface Props {
  loading: boolean;
  errorMessage: string;
}

const ListItem = (props: Props) => {
  const listItem = useSelector((state: AppState) => state.list.list);
  console.log(listItem);

  return (
    <div>
      {listItem?.map((item) => {
        return <Item key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ListItem;
