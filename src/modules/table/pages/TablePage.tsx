import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { mockData } from '../../../configs/mock_data';
import { ITableItem } from '../../../models/table';
import { AppState } from '../../../redux/reducer';
import { setTableData, setTableTempData, sortData } from '../redux/tableRedux';
import Filter from '../components/Filter';
import Table from '../components/Table';
import Footer from '../components/Footer';

const TablePage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [dataTable, setDataTable] = useState<ITableItem[]>();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    currItem: 0,
    itemPerPage: 5,
    totalItem: mockData.length,
  });
  const data = useSelector((state: AppState) => state.table.tempItem);

  const handleChangePage = useCallback(
    (num: number) => {
      if (dataTable) {
        if (num === 0 || num++ + Math.ceil(pageInfo.totalItem / pageInfo.itemPerPage) + 1) return;
        setPageInfo((prev) => {
          return { ...prev, page: num, currItem: num * pageInfo.itemPerPage - pageInfo.itemPerPage };
        });
      }
    },
    [dataTable, pageInfo.totalItem, pageInfo.itemPerPage],
  );

  const sortDatabyDate = useCallback(() => {
    if (data) {
      dispatch(sortData());
      setPageInfo({ page: 1, currItem: 0, itemPerPage: 5, totalItem: data.length });
    }
  }, [dispatch, data]);

  const changeItemPerPage = useCallback((num: number) => {
    setPageInfo((prev) => {
      return { ...prev, itemPerPage: num, page: 1, currItem: 0 };
    });
  }, []);

  useEffect(() => {
    dispatch(setTableData(mockData));
    dispatch(setTableTempData(mockData));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setDataTable(data.slice(pageInfo.currItem, pageInfo.page * pageInfo.itemPerPage));
    }
  }, [data, pageInfo]);

  useEffect(() => {
    if (data) {
      setPageInfo((prev) => {
        return { ...prev, totalItem: data.length };
      });
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
      {dataTable && <Table data={dataTable} sort={sortDatabyDate} />}
      {data && (
        <Footer
          currPage={+pageInfo.page}
          totalPage={+(pageInfo.totalItem / pageInfo.itemPerPage)}
          itemPerPage={+pageInfo.itemPerPage}
          handleChangePage={handleChangePage}
          handleChangeItemPerPage={changeItemPerPage}
        />
      )}
    </div>
  );
};

export default TablePage;
