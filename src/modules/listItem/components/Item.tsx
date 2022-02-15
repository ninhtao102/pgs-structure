import React from 'react';
import { Iitem } from '../../../models/list';

export interface Props {
  item: Iitem;
}

const Item = (prop: Props) => {
  const { id, title, thumbnailUrl } = prop.item;
  const color = id % 2 ? 'white' : '#ade8f4';
  return (
    <div
      // className="row justify-content-md-start "
      style={{
        border: '1px solid #333d29',
        display: 'flex',
        flexWrap: 'nowrap',
      }}
    >
      <div>
        <img src={thumbnailUrl} alt="" style={{ maxWidth: '100px', margin: 'auto' }} />
      </div>
      <div
        style={{
          //   margin: '30px 0',
          alignItems: 'center',
        }}
      >
        <p>{title}</p>
        <p>{Date.now()}</p>
      </div>
    </div>
  );
};

export default Item;
