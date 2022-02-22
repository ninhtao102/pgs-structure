import React, { useState, useCallback, useEffect } from 'react';

interface Props {
  totalPage: number;
  itemPerPage: number;
  currPage: number;
  handleChangePage(num: number): void;
}

const Footer = (props: Props) => {
  const lastPage = Math.ceil(props.totalPage);
  const [displayPage, setDisplayPage] = useState({ start: 0, end: 4 });
  const totalPage = Array.from(Array(lastPage).keys()).slice(displayPage.start, displayPage.end);
  const itemPerPage =
    props.totalPage * props.itemPerPage >= 10 ? props.itemPerPage : props.totalPage * props.itemPerPage;
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
      <p>
        Showing {props.itemPerPage} from {props.totalPage * props.itemPerPage}
      </p>
      <div className="d-flex">
        <nav aria-label="Page navigation example">
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
