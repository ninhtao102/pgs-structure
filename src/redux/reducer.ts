import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import ListReducer, { IListState } from '../modules/listItem/redux/listReducer';
import TableReducer, { ITableState } from '../modules/table/redux/tableRedux';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  list: IListState;
  table: ITableState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    list: ListReducer,
    table: TableReducer,
  });
}
