import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { Iitem } from '../../../models/list';
import { AppState } from '../../../redux/reducer';
import { setSingleItem } from '../redux/listReducer';

export interface Props {
  item: Iitem;
}

const Item = (prop: Props) => {
  const { id, title, thumbnailUrl } = prop.item;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(title);
  const color = id % 2 ? 'white' : '#ade8f4';
  const onBlur = React.useCallback(
    (text: string) => {
      dispatch(setSingleItem({ id: +id, value: text }));
    },
    [dispatch, id],
  );
  React.useEffect(() => {
    setText(title);
  }, [title]);

  return (
    <div
      // className="row justify-content-md-start "
      style={{
        border: '1px solid #333d29',
        display: 'flex',
        flexWrap: 'nowrap',
        backgroundColor: color,
      }}
    >
      <div>
        <img
          className="mx-3 rounded-circle"
          src={thumbnailUrl}
          alt="img"
          style={{
            maxWidth: '100px',
            margin: 'auto',
            objectFit: 'cover',
            height: '50px',
            width: '50px',
            alignItems: 'center',
          }}
        />
      </div>
      <div
        style={{
          //   margin: '30px 0',
          alignItems: 'center',
        }}
      >
        <h3 style={{ flex: '1' }}>{title}</h3>
        <p>{Date.now()}</p>
      </div>
    </div>
  );
};

export default memo(Item);
