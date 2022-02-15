import React from 'react';
import { FormattedMessage } from 'react-intl';
import Item from './Item';

interface Props {
  loading: boolean;
  errorMessage: string;
}

const ListItem = (props: Props) => {
  return (
    <div>
      <div className="row justify-content-md-end" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            // disabled={loading}
          >
            {/* {loading && <div className="spinner-border spinner-border-sm text-align mr-2" role="status" />} */}
            <FormattedMessage id="confirm" />
          </button>
        </div>

        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            // disabled={loading}
          >
            {/* {loading && <div className="spinner-border spinner-border-sm text-align mr-2" role="status" />} */}
            <FormattedMessage id="reset" />
          </button>
        </div>
      </div>
      <div className="row justify-content-md-center">{/* <Item key={item} item={item} /> */}</div>
    </div>
  );
};

export default ListItem;
