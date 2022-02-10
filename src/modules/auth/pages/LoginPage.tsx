import React from 'react';
import { useState } from 'react';
import { ILoginParams } from '../../../models/auth';
import LoginForm from '../components/LoginForm';
import logo from '../../../logo-420-x-108.png';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
// import { replace } from 'lodash';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { getErrorMessageResponse } from '../../../utils';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { FormattedMessage } from 'react-intl';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', {email: values.email, password: values.password}),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data)); //dispatch action set user data
        //Set login token to Cookie when user choose remember me
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, {expires: values.rememberMe ? 7 : undefined});
        //Replace current path to home page 
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
  }, [dispatch]);

  return (
  <div
  className='container'
  style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }}>
    <img src={logo} alt="" style={{maxWidth: '250px', margin: '32px'}} />
    <LoginForm onLogin={onLogin} loading={false} errorMessage={errorMessage} />
    {/* <a href="/register">
      <FormattedMessage id="register"/>
    </a> */}
  </div>
  );
};

export default LoginPage;
