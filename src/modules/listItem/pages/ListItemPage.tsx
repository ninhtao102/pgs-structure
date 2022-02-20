import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { start } from 'repl';

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

  const [fetchInfo, setFetchInfo] = useState({
    start: 1,
    end: 20,
    itemPerLoad: 10, //so luong item can load them khi scroll man hinh
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const observer = useRef<any | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) {
          setFetchInfo((prev) => {
            return {
              start: prev.end,
              end: prev.end + prev.itemPerLoad,
              itemPerLoad: prev.itemPerLoad,
            };
          });
        }
      });
      // if (node) observer.current.observer(node);
    },
    [loading],
  );

  const fetchListData = React.useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    // lay api voi fetchThunk
    const json = await dispatch(
      fetchThunk(`${API_PATHS.alist}?_start=${fetchInfo.start}&_end=${fetchInfo.end}`, 'get'),
    );

    setLoading(false);

    // kiem tra json nhan lai de xu ly
    if (json) {
      // console.log('json', json);
      if (tempListItem?.length !== 0 && tempListItem) {
        const newList = tempListItem.concat(json);
        console.log(newList);
        setTempListItem(newList);
        dispatch(setListItemData(newList));
        return;
      } else {
        setTempListItem(json);
        dispatch(setListItemData(json));
        return;
      }
    }

    setErrorMessage(getErrorMessageResponse(json));
    return;
  }, [dispatch, fetchInfo]);

  useEffect(() => {
    fetchListData();
    if (errorMessage) {
      console.log(errorMessage);
    }
  }, [fetchListData, errorMessage]);

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
      {loading && tempListItem?.length === 0 ? (
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
          <ListItem loading={loading} lastItemRef={lastItemRef} listItem={listItem} />
        </div>
      )}
    </div>
  );
};

export default ListItemPage;
