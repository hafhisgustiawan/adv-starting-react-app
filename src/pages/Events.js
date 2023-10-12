import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

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

// function EventsPage() {
//   const data = useLoaderData(); //bisa dipanggil juga ke inner component
//   // if (data.isError) {
//   //   return <p>{data.message}</p>;
//   // }
//   const events = data.events;

//   return <EventsList events={events || []} />;
// }

const EventsPage = () => {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading di events...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => {
          return <EventsList events={loadedEvents || []} />;
        }}
      </Await>
    </Suspense>
  );
};

export default EventsPage;

const loadEventsData = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch data' }, { status: 400 });
  } else {
    const res = await response.json();
    return res.events;
  }
};

export const eventLoader = async () => {
  // // nanti ini akan di panggil oleh app.js untuk dijadikan loader func dan kembali ke component ini juga
  // const response = await fetch('http://localhost:8080/events');
  // if (!response.ok) {
  //   // return { isError: true, message: 'Could not fetch event!' };
  //   // throw new Response(
  //   //   JSON.stringify({ message: 'Could not fetch events', status: 500 })
  //   // ); // ini akan men-trigger error handler dari react router terdekat, cek video 325
  //   throw json({ message: 'Could not fetch data' }, { status: 400 });
  // } else {
  //   const res = await response.json();
  //   return res;
  // }

  // DEFER INI DIGUNAKAN KETIKA KITA INGIN COMPONENT DI TAMPILKAN LUAN SEMBARI MENUNGGU DATA DI HASILKAN OLEH PROMISE FETCH API YANG KITA BUAT
  return defer({
    events: loadEventsData(),
  });
};
