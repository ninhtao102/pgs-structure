import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import './App.css';
import { API_PATHS } from './configs/api';
import { setUserInfo } from './modules/auth/redux/authReducer';
import { fetchThunk } from './modules/common/redux/thunk';
import { AppState } from './redux/reducer';
import { Routes } from './Routes';
import { ACCESS_TOKEN_KEY } from './utils/constants';
import { RESPONSE_STATUS_SUCCESS } from './utils/httpResponseCode';

function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));

  const getProfile = React.useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

    if (accessToken && !user) {
      const json = await dispatch(fetchThunk(API_PATHS.userProfile));
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo({ ...json.data, token: accessToken }));
      }
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
