import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { Iitem } from '../../../models/list';

export interface IListState {
  list?: Iitem[];
  pendingList?: Iitem[]; // du lieu gia de gan ket qua sau khi confirm
}

// typesafe-actions để tạo ra action(?)

export const setListItemData = createCustomAction('list/setListItemData', (data: Iitem[]) => ({
  data,
}));

export const setPendingList = createCustomAction('list/setPendingList', (data: Iitem[]) => ({
  data,
}));

const actions = { setListItemData, setPendingList };

//Tao action type(?)
type Action = ActionType<typeof actions>;

export default function ListReducer(state: IListState = {}, action: Action) {
  switch (action.type) {
    // getType tra ve tham so dau cua createCustomAction
    case getType(setListItemData):
      return { ...state, list: action.data };
    case getType(setPendingList):
      return { ...state, pendingList: action.data };
    default:
      return state;
  }
}
