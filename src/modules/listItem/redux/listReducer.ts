import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { Iitem } from '../../../models/list';

export interface IListState {
  list?: Iitem[];
}

// typesafe-actions để tạo ra action(?)

export const setListItemData = createCustomAction('list/setListItemData', (data: Iitem[]) => ({
  data,
}));

export const setSingleItem = createCustomAction('list/setSingleItem', (data: { id: number; value: string }) => ({
  data,
}));

const actions = { setListItemData, setSingleItem };

//Tao action type(?)
type Action = ActionType<typeof actions>;

export default function ListReducer(state: IListState = {}, action: Action) {
  switch (action.type) {
    // getType tra ve tham so dau cua createCustomAction
    case getType(setListItemData):
      return { ...state, list: [...action.data] };
    case getType(setSingleItem): {
      const { id, value } = action.data;
      if (state.list) {
        const newItems = [...state.list];
        const cloneItem = { ...newItems[+id - 2], title: value };
        newItems[+id - 2] = cloneItem;
        return { ...state, list: newItems };
      }
      return { ...state };
    }
    default:
      return state;
  }
}
