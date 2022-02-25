import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { resetData } from '../redux/authReducer';

interface Prop {
  classBtn: string;
}

const LogOut = (props: Prop) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const auth = Cookies.get(ACCESS_TOKEN_KEY);
  const onLogOut = () => {
    if (auth) {
      dispatch(resetData());
      Cookies.remove(ACCESS_TOKEN_KEY, { path: '/', domain: 'localhost' });
      dispatch(replace(ROUTES.home));
    } else {
      dispatch(replace(ROUTES.home));
    }
  };
  return (
    <div
      className={props.classBtn}
      onClick={onLogOut}
      style={{ minWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <FormattedMessage id="logout" />
    </div>
  );
};

export default LogOut;
