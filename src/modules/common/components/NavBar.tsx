import Cookies from 'js-cookie';
import React from 'react';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY, avatarDefault } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import logo from '../../../logo-420-x-108.png';

const NavBar = () => {
  const { name, avatar } = useSelector((state: AppState) => {
    return {
      name: state.profile.user?.name,
      avatar: state.profile.user?.avatar,
    };
  });
  const auth = Cookies.get(ACCESS_TOKEN_KEY);
  const src = avatar ? avatar : avatarDefault;

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <div className="container-fluid">
        <div className="d-flex">
          <Link to={ROUTES.home}>
            <img src={logo} alt="" style={{ maxWidth: '157px', height: '100%', objectFit: 'cover' }} />
          </Link>
          <div className="navbar-collapse">
            <ul className="navbar-nav mr-auto d-flex flex-row">
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.home}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.list}>
                  List Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {auth && (
          <div className="px-4">
            <Link className="nav-link" to={ROUTES.user} id="navbarDropdown" role="button">
              <p style={{ color: 'white', margin: 'auto', paddingRight: '10px' }}>{name}</p>
              <img src={src} width="40" height="40" className="rounded-circle" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
