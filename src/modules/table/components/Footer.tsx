import React, { useState, useCallback, useEffect } from 'react';

interface Props {
  totalPage: number;
  itemPerPage: number;
  currPage: number;
  handleChangePage(num: number): void;
  handleChangeItemPerPage(num: number): void;
}

const Footer = (props: Props) => {
  const lastPage = Math.ceil(props.totalPage);
  const [displayPage, setDisplayPage] = useState({ start: 0, end: 4 });
  const totalPage = Array.from(Array(lastPage).keys()).slice(displayPage.start, displayPage.end);
  const pages = [5, 10, 15, 20];

  const changeDisplayPage = useCallback(() => {
    if (lastPage < 4) return;
    if (props.currPage === 1) {
      setDisplayPage({ start: 0, end: 4 });
    }
    if (props.currPage === displayPage.end) {
      setDisplayPage((prev) => {
        return { start: prev.start + 3, end: prev.end + 3 };
      });
    }
    if (props.currPage === displayPage.start && props.currPage != 1) {
      setDisplayPage((prev) => {
        return { start: prev.start - 3, end: prev.end - 3 };
      });
    }
    return;
  }, [props.currPage, lastPage, displayPage.start, displayPage.end]);

  useEffect(() => {
    changeDisplayPage();
  }, [changeDisplayPage]);

  useEffect(() => {
    if (props.currPage === 1) {
      setDisplayPage({ start: 0, end: 4 });
    }
  }, [props.currPage]);

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex ">
        <p className="pt-1">Showing</p>
        <div className="px-1">
          <select
            className="form-select"
            defaultValue={props.itemPerPage}
            onChange={(e) => {
              props.handleChangeItemPerPage(+e.target.value);
            }}
          >
            {pages.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <p className="pt-1">from {props.totalPage * props.itemPerPage}</p>
      </div>
      <div className="d-flex">
        <nav aria-label="Page navigation example" style={{ cursor: 'pointer' }}>
          <ul className="pagination page">
            <li
              className={`${props.currPage === 1 ? 'disabled' : ''} page-item`}
              onClick={() => {
                props.handleChangePage(1);
              }}
            >
              <p className="page-link" aria-label="First">
                <span aria-hidden="true">&Iota;&lt;</span>
              </p>
            </li>
            <li
              className={`${props.currPage === 1 ? 'disabled' : ''} page-item`}
              onClick={() => {
                if (props.currPage === 1) return;
                props.handleChangePage(props.currPage - 1);
                console.log(props.currPage);
              }}
            >
              <p className="page-link" aria-label="Previous">
                <span aria-hidden="true">&lt;</span>
              </p>
            </li>
            {totalPage.map((num) => {
              return (
                <li key={num} className={`${num + 1 === props.currPage ? 'active' : ''} page-item`}>
                  <p
                    className="page-link"
                    aria-label=""
                    onClick={() => {
                      props.handleChangePage(num + 1);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {+num + 1}
                  </p>
                </li>
              );
            })}
            <li
              className={`${props.currPage === lastPage ? 'disabled' : ''} page-item`}
              onClick={() => {
                if (props.currPage === lastPage) return;
                props.handleChangePage(props.currPage + 1);
              }}
            >
              <p className="page-link" aria-label="Next">
                <span aria-hidden="true">&gt;</span>
              </p>
            </li>
            <li
              className={`${props.currPage === lastPage ? 'disabled' : ''} page-item`}
              onClick={() => {
                props.handleChangePage(props.totalPage - 1);
              }}
            >
              <p className="page-link" aria-label="Last">
                <span aria-hidden="true">&gt;&Iota;</span>
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
