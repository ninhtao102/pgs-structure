import React from 'react';
import Cookies from 'js-cookie';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { resetData } from '../redux/authReducer';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';

const LogOut = () => {
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
    <div>
      <button
        type="button"
        onClick={onLogOut}
        className="btn btn-primary"
        style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <FormattedMessage id="logout" />
      </button>
    </div>
  );
};

export default LogOut;
