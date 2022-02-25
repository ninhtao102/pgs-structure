import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { avatarDefault } from '../../../utils/constants';
import LogOut from '../../auth/components/Logout';

const UserInfo = () => {
  const { name, email, avatar, state, region } = useSelector((state: AppState) => {
    return {
      name: state.profile.user?.name,
      email: state.profile.user?.email,
      avatar: state.profile.user?.avatar,
      state: state.profile.user?.state,
      region: state.profile.user?.region,
    };
  });

  const src = avatar ? avatar : avatarDefault;
  const inputRef = useRef<any>();
  const inputFile = () => {
    inputRef.current.click();
    return;
  };

  return (
    <div className="container py-5">
      <div className="card md-4 ">
        <div className="card-body w-25 align-self-center user__profile">
          <div className="d-flex justify-content-center user__avatar">
            <img
              src={src}
              alt="avatar"
              className="rounded-circle img-fluid user__avatar--detail"
              onClick={inputFile}
              style={{ width: '160px', height: '160px' }}
            />
            <p className="text-center user__avatar--message" onClick={inputFile}>
              <FormattedMessage id="updateAvatar" />
            </p>
            <input ref={inputRef} type="file" accept=".jpg, .png, .jpeg" hidden />
          </div>
          <h5 className="my-3">
            <FormattedMessage id="email" />
          </h5>
          <p className="my-3">{email}</p>
          <h5 className="my-3">
            <FormattedMessage id="username" />
          </h5>
          <p className="my-3">{name}</p>
          <h5 className="my-3">
            <FormattedMessage id="description" />
          </h5>
          <h6 className="my-3">
            <FormattedMessage id="region" />
          </h6>
          <p>{region}</p>
          <h6 className="my-3">
            <FormattedMessage id="state" />
          </h6>
          <p>{state}</p>

          <div className="d-flex" style={{ justifyContent: 'center' }}>
            <div style={{ width: '160px' }}>
              <LogOut classBtn="btn btn-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
