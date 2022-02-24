import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ITableItem } from '../../../models/table';
import { AppState } from '../../../redux/reducer';
import { statusType } from '../constants';
import { setSingleItem } from '../redux/tableRedux';
import Modal from './Modal';

interface Props {
  item: ITableItem;
}

const ModalDetail = (props: Props) => {
  const { item } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [newData, setNewData] = useState(item);
  const btnValue = {
    modalBtn: {
      value: 'View more',
      classStyle: 'modal-btn-detail',
    },
    leftBtn: {
      value: 'Save',
      classStyle: 'btn btn-primary mx-3',
    },
    rightBtn: {
      value: 'Cancel',
      classStyle: 'btn btn-secondary mx-3',
    },
  };
  const handleSave = () => {
    dispatch(setSingleItem(newData));
  };
  return (
    <Modal
      modalBtn={btnValue.modalBtn}
      leftBtn={btnValue.leftBtn}
      rightBtn={btnValue.rightBtn}
      modelClass="modal-detail-content"
      onClick={handleSave}
    >
      <h3 className="" style={{ margin: 'auto' }}>
        Item Detail
      </h3>
      <form
        style={{ maxWidth: '300px', width: '100%', margin: 'auto' }}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="row g-1 needs-validation"
      >
        <div className="col-md-12">
          Status
          <select
            className="form-select"
            defaultValue={item.status}
            onChange={(e) => {
              setNewData({ ...newData, status: e.target.value });
            }}
            aria-label="select"
          >
            {statusType.map((status) => {
              return (
                <option value={status} key={status}>
                  {status}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              defaultValue={dayjs(item.time_created).format('YYYY-MM-DD')}
              onChange={(e) => {
                setNewData({ ...newData, time_created: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="date">Funding Method</label>
            <input
              type="text"
              className="form-control"
              id="method"
              defaultValue={item.payment_type}
              onChange={(e) => {
                setNewData({ ...newData, payment_type: e.target.value });
              }}
            />
          </div>
        </div>
        {/* <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="date">Payroll Currency</label>
            <input
              type="text"
              className="form-control"
              id="currency"
              defaultValue={item.currency}
              onChange={(e) => {
                setNewData({ ...newData, currency: e.target.value });
              }}
            />
          </div>
        </div> */}
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="total">Total</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, volume_input_in_input_currency: +e.target.value });
              }}
              id="total"
              defaultValue={item.volume_input_in_input_currency}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="order">Order</label>
            <input type="text" disabled className="form-control" id="order" defaultValue={item.payroll_id} />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalDetail;
