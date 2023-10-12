import { Fragment } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const Root = () => {
  const navigation = useNavigation();

  return (
    <Fragment>
      <MainNavigation />
      {navigation.state === 'loading' && <p>Loading...</p>}
      {navigation.state === 'submitting' && <p>Submitting...</p>}
      <Outlet />
    </Fragment>
  );
};

export default Root;
