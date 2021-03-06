import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import NavBar from './modules/common/components/NavBar';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const UserPage = lazy(() => import('./modules/home/pages/UserPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('./modules/auth/pages/RegisterPage'));
const ListItemPage = lazy(() => import('./modules/listItem/pages/ListItemPage'));
const Table = lazy(() => import('./modules/table/pages/TablePage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <NavBar />
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path={ROUTES.register} component={RegisterPage} />
        <Route path={ROUTES.list} component={ListItemPage} />
        <Route path={ROUTES.table} component={Table} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <ProtectedRoute path={ROUTES.user} component={UserPage} />
        <Route path={ROUTES.contact} component={ContactPage} />

        {/* <Route path="/" component={LoginPage} /> */}
        <ProtectedRoute path="/" component={HomePage} />
      </Switch>
    </Suspense>
  );
};
