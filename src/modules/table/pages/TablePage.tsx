import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { mockData } from '../../../configs/mock_data';
import { ITableItem } from '../../../models/table';
import { AppState } from '../../../redux/reducer';
import { ITableState } from '../redux/tableRedux';
import { setTableData, setTableTempData } from '../redux/tableRedux';
import Filter from '../components/Filter';
import Table from '../components/Table';

const TablePage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [dataTable, setDataTable] = useState<ITableItem>();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    curItem: 0,
    itemPerPage: 10,
    totalItem: mockData.length,
  });
  const data = useSelector((state: AppState) => state.table.tempItem);

  // const handleChangePage = (num: number) => {
  //   if (dataTable) {
  //     if (num === 1 )
  //   }
  // }

  useEffect(() => {
    dispatch(setTableData(mockData));
    dispatch(setTableTempData(mockData));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setDataTable(data);
    }
  }, [data]);

  return (
    <div className="py-3 vh-100 container-sm bg-light">
      <div className="align-items-center d-flex justify-content-between">
        <h3 className="header-title">
          <FormattedMessage id="payrollTransactionsList" />
        </h3>
        <input className="btn btn-primary " type="button" value="Export CSV" />
      </div>
      <Filter />
      {dataTable && <Table data={dataTable} />}
    </div>
  );
};

export default TablePage;
