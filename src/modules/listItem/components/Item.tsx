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
            marginTop: '8px',
            // margin: 'auto',
            maxWidth: '100px',
            objectFit: 'cover',
            width: '60px',
            alignItems: 'center',
          }}
        />
      </div>
      <div>
        {isEdit ? (
          <input
            type="text"
            style={{ width: '100vh' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={(e) => {
              setIsEdit(false);
              onBlur(e.target.value);
            }}
          />
        ) : (
          <h4 className="list-text-title" onClick={() => setIsEdit(true)}>
            {title}
          </h4>
        )}
        <p>{Date.now()}</p>
      </div>
    </div>
  );
};

export default memo(Item);
