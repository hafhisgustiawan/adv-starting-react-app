import { Fragment } from 'react';
import EventsNavigation from '../components/EventsNavigation';
import { Outlet } from 'react-router-dom';

const EventsRoot = () => {
  return (
    <Fragment>
      <EventsNavigation />
      <Outlet />
    </Fragment>
  );
};
export default EventsRoot;
