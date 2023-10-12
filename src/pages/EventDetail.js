import { Suspense } from 'react';
import {
  json,
  redirect,
  useRouteLoaderData,
  defer,
  Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import { Fragment } from 'react';
import EventsList from '../components/EventsList';

const EventDetail = () => {
  //disini harus pake useRouteLoaderData karena loadernya ada di parent root, intinya kalo gagal pake useLoaderData maka pake useRouteLoaderData
  // const data = useRouteLoaderData('event-detail');
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <Fragment>
      <Suspense fallback={<p>Loading event...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading events...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export default EventDetail;

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch data' }, { status: 400 });
  } else {
    const res = await response.json();
    return res.events;
  }
};

const loadEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not found event with that id' },
      { status: 500 }
    );
  } else {
    const res = await response.json();
    return res.event;
  }
};

//parameter ini di berikan oleh react router kepada loader func tanpa harus di setting apapun. NICE!!!
export const loader = async ({ request, params }) => {
  // const response = await fetch(`http://localhost:8080/events/${params.id}`);
  // if (!response.ok) {
  //   throw json(
  //     { message: 'Could not found event with that id' },
  //     { status: 500 }
  //   );
  // } else {
  //   return response;
  // }

  return defer({
    events: loadEvents(),
    event: loadEvent(params.id),
  });
};

export const action = async ({ request, params }) => {
  const eventId = params.id;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event with that id' },
      { status: 500 }
    );
  }
  return redirect('/events');
};
