import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditEvent = () => {
  // cuma bisa dipanggil dalam inner child
  const data = useRouteLoaderData('event-detail');

  return <EventForm method="PATCH" event={data.event} />;
};

export default EditEvent;
