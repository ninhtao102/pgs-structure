import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ITableItem } from '../../../models/table';
// typesafe-actions để tạo action(?)

export interface ITableState {
  item?: ITableItem[];
  tempItem?: ITableItem[];
}

export interface IFilterTable {
  type: 'status' | 'time_created' | 'payroll_id';
  value: string | number;
  payload?: string;
}

export const setTableData = createCustomAction('table/setTableData', (data: ITableItem[]) => ({
  data,
}));
export const setTableTempData = createCustomAction('table/setTableTempData', (data: ITableItem[]) => ({
  data,
}));
export const filterTableData = createCustomAction('table/filterTableData', (data: IFilterTable[]) => ({
  data,
}));
export const setSingleItem = createCustomAction('table/setSingleItem', (data: ITableItem) => ({
  data,
}));
export const deleteItem = createCustomAction('table/deleteItem', (id: string) => ({
  id,
}));
export const sortData = createCustomAction('table/sortData', () => ({}));

const actions = { setTableData, setTableTempData, filterTableData, setSingleItem, deleteItem, sortData };

//Tạo action type(?)
type Action = ActionType<typeof actions>;

export default function reducer(state: ITableState = {}, action: Action) {
  switch (action.type) {
    //getType trả về tham số đầu của createCustomAction(?)
    case getType(setTableData):
      return { ...state, item: action.data };
    case getType(setTableTempData):
      return { ...state, itemTemp: action.data };
    case getType(filterTableData): {
      const filter = action.data;
      const newData = state.item?.filter((item) => {
        for (let i = 0; i < filter.length; i++) {
          if (filter[i].value === '') return true;
          if (
            item[`${filter[i].type}`] === filter[i].value ||
            item[`${filter[i].type}`].toString().includes(filter[i].value.toString())
          ) {
            return true;
          } else return false;
        }
      });
      return { ...state, tempItem: newData };
    }
    case getType(setSingleItem): {
      const newData = state.item?.map((item) => {
        if (item.payroll_id === action.data.payroll_id) {
          item = { ...action.data };
        }
        return item;
      });
      return { ...state, item: newData, tempItem: newData };
    }
    case getType(deleteItem): {
      const newData = state.item?.map((item) => {
        return item.payroll_id != action.id;
      });
      return { ...state, item: newData, tempItem: newData };
    }
    case getType(sortData): {
      const newData = state.tempItem?.sort((a, b) => {
        return +new Date(a.time_created) - +new Date(b.time_created);
      });
      return { ...state, item: newData, tempItem: newData };
    }
    default:
      return state;
  }
}
