import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  // useFetcher hooks ini memiliki atribut yang bagus, jadi dia punya atribut form dimana dia bisa mengakses action adari route lain menggunakan props action di componentnya, cek video 337

  //cek halaman EventForm dimana menggunakan useNavigation dan useActionData. Ini mirip dengan gabungan keduanya, tapi ini bisa menggunakan action dari route lain
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      console.log(data);
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/events/new"
      className={classes.newsletter}
    >
      {/*MENGISI ACTION DI FORM INI PENTING, JIKA TIDAK DIA GAK TAU MAU MENG-EKSEKUSI ACTION YANG MANA. MAKA DARI ITU DIA HANYA AKAN MENGAKSES ACTION DARI ROUTE YANG SALAH*/}
      {/*USE FETCHER INI BAGUS DIGUNAKAN UNTUK MENGAKSES ACTION DARI SEBUAH ROUTING DI LUAR DARI ROUTING TERSEBUT TANPA HARUS BERNAVIGASI KE ROUTING MANAPUN*/}
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>{state === 'submitting' ? 'Submitting' : 'Sign up'}</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
