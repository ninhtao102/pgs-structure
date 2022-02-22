import React, { useState, useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { statusType } from '../constants';
import { filterTableData, IFilterTable } from '../redux/tableRedux';

const Filter = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [filterValue, setFilterValue] = useState<IFilterTable[]>([
    { type: 'status', value: '' },
    { type: 'time_created', value: '' },
    { type: 'payment_type', value: '' },
    { type: 'volume_input_in_input_currency', value: '' },
  ]);
  const filterByField = useCallback((data: IFilterTable) => {
    setFilterValue((prev) => {
      const newValue = prev?.map((item) => {
        if (item.type === data.type) {
          item.value = data.value;
        }
        return item;
      });
      return newValue;
    });
  }, []);

  useEffect(() => {
    dispatch(filterTableData(filterValue));
  }, [filterValue, dispatch]);

  return (
    <form>
      <div className="my-3 form-row align-items-center d-flex justify-content-between">
        <div className="col-lg-2">
          <select
            className="form-select"
            onChange={(e) => {
              console.log(e.target.value);
              filterByField({ type: 'status', value: e.target.value });
            }}
          >
            <option selected value={undefined}>
              Status
            </option>
            {statusType.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className="col-lg-2">
          <select className="form-select">
            <option selected>Client</option>
          </select>
        </div> */}
        <div className="col-lg-2 px-2">
          <input type="date" className="form-control" placeholder="from"></input>
        </div>
        <div className="col-lg-2 px-2">
          <input type="date" className="form-control" placeholder="to"></input>
        </div>
        <div className="col-lg-2 px-2">
          <input type="text" className="form-control" placeholder="Order #"></input>
        </div>
        <div className="col-lg-2 d-flex justify-content-between">
          <button type="button" className="btn btn-outline-primary" style={{ width: '100px' }}>
            <FormattedMessage id="apply" />
          </button>
          <button type="button" className="btn btn-outline-danger" style={{ width: '100px' }}>
            <FormattedMessage id="clear" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filter;
