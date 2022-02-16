import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
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
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchListData = React.useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    // lay api voi fetchThunk
    const json = await dispatch(fetchThunk(API_PATHS.list, 'get'));
    console.log(json);

    setLoading(false);

    // kiem tra json nhan lai de xu ly
    if (json) {
      dispatch(setListItemData(json));
      return;
    }

    setErrorMessage(getErrorMessageResponse(json));
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
        margin: '30px auto',
        flexDirection: 'column',
      }}
    >
      <div className="row justify-content-md-end" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FormattedMessage id="confirm" />
          </button>
        </div>

        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FormattedMessage id="reset" />
          </button>
        </div>
      </div>
      {loading === false && <ListItem loading={loading} errorMessage={errorMessage} />}
    </div>
  );
};

export default ListItemPage;
