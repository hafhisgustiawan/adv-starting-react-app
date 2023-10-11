// import { useEffect, useState } from 'react';
import { useLoaderData, json } from 'react-router-dom';

import EventsList from '../components/EventsList';

// function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:8080/events');

//       if (!response.ok) {
//         setError('Fetching events failed.');
//       } else {
//         const resData = await response.json();
//         setFetchedEvents(resData.events);
//       }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }

function EventsPage() {
  const data = useLoaderData(); //bisa dipanggil juga ke inner component
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;

  return <EventsList events={events || []} />;
}

export default EventsPage;

export const eventLoader = async () => {
  // nanti ini akan di panggil oleh app.js untuk dijadikan loader func dan kembali ke component ini juga
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch event!' };
    // throw new Response(
    //   JSON.stringify({ message: 'Could not fetch events', status: 500 })
    // ); // ini akan men-trigger error handler dari react router terdekat, cek video 325
    throw json({ message: 'Could not fetch data' }, { status: 400 });
  } else {
    const res = await response.json();
    return res;
  }
};
