import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    if (window.confirm('Are you sure?')) {
      // cek video 333. useSubmit ini memberikan kendali seperti submit form dimana pada parameter pertama dia bisa mengirim form data ke action, dan nantinya di action func bisa di akses menggunakan await request.formData() dan parameter kedua itu jadi obj biasa di parameter request
      submit(null, { method: 'DELETE' /*, action:'/different-route'*/ });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
