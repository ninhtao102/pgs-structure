import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ITableItem } from '../../../models/table';
import { AppState } from '../../../redux/reducer';
import { deleteItem } from '../redux/tableRedux';
import Modal from './Modal';

interface Props {
  item: ITableItem;
}

const ModalDelete = (props: Props) => {
  const { item } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const btnValue = {
    modalBtn: {
      value: <BsFillTrashFill color="red" />,
      classStyle: 'modal-btn-delete',
    },
    leftBtn: {
      value: 'Save',
      classStyle: 'btn btn-danger',
    },
    rightBtn: {
      value: 'Cancel',
      classStyle: 'btn btn-secondary mx-3',
    },
  };
  const handleDelete = () => {
    dispatch(deleteItem(item.payroll_id));
  };
  return (
    <div>
      <Modal
        modalBtn={btnValue.modalBtn}
        leftBtn={btnValue.leftBtn}
        rightBtn={btnValue.rightBtn}
        modelClass="modal-delete-content"
        onClick={handleDelete}
      >
        <h3 className="" style={{ margin: 'auto' }}>
          Delete Item
        </h3>
        <div className="">
          <p style={{ textAlign: 'center' }}>
            <FormattedMessage id="requestDelete" />
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDelete;
