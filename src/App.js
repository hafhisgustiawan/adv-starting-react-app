import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Event, { eventLoader } from './pages/Events';
import Error from './pages/Error';
import EventDetail from './pages/EventDetail';
import NewEvent from './pages/NewEvent';
import EventsRoot from './pages/EventsRoot';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'events',
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <Event />,
            loader: eventLoader,
            // loader: async () => {
            //   // dont worry about this async function which return promise, react router will handle it in result component or pages
            //   const response = await fetch('http://localhost:8080/events');

            //   if (!response.ok) {
            //     // ...
            //   } else {
            //     const resData = await response.json();
            //     return resData.events;
            //   }
            // },
          },
          { path: 'new', element: <NewEvent /> },
          { path: ':id', element: <EventDetail /> },
          { path: ':id/edit', element: <EventDetail /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
