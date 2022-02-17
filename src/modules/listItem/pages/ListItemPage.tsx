import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import { fetchThunk } from '../../common/redux/thunk';
import { setListItemData } from '../redux/listReducer';
import ListItem from '../components/ListItem';

const ListItemPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const { listItem } = useSelector((state: AppState) => {
    return {
      listItem: state.list.list,
    };
  });

  const [tempListItem, setTempListItem] = useState(listItem);
  // console.log('state', tempListItem);
  // console.log('store', listItem);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  console.log('aaaaaaaaaaaaaaa');

  const fetchListData = React.useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    // lay api voi fetchThunk
    const json = await dispatch(fetchThunk('https://jsonplaceholder.typicode.com/photos', 'get'));
    console.log(json);
    console.log('aaaaaaaaaaaaaaa');

    setLoading(false);

    // kiem tra json nhan lai de xu ly
    if (json) {
      setTempListItem(json);
      dispatch(setListItemData(json));
      console.log('BBBBBBBBBBBBBBBB');
      return;
    }

    console.log('cccccccccccccc');

    setErrorMessage(getErrorMessageResponse(json));
    return;
  }, [dispatch]);

  useEffect(() => {
    fetchListData;
  }, [fetchListData]);

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        height: '100vh',
        width: '80%',
        margin: '30px auto',
        flexDirection: 'column',
      }}
    >
      <p>console</p>
      {/* {loading ? (
        <div className="spinner-border" role="status" style={{ margin: 'auto' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="">
          <div className="row justify-content-md-end" style={{ margin: '16px 0' }}>
            <div className="col-md-auto">
              <button
                className="btn btn-primary"
                style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => {
                  if (tempListItem && listItem) {
                    console.log('confirm');
                    setTempListItem([...listItem]);
                  }
                }}
              >
                <FormattedMessage id="confirm" />
              </button>
            </div>

            <div className="col-md-auto">
              <button
                className="btn btn-primary"
                style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => {
                  if (tempListItem) {
                    console.log('reset');
                    dispatch(setListItemData([...tempListItem]));
                  }
                }}
              >
                <FormattedMessage id="reset" />
              </button>
            </div>
          </div>
          <ListItem listItem={listItem} />
        </div>
      )} */}
    </div>
  );
};

export default ListItemPage;
