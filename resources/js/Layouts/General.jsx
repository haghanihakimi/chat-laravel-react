import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import route from 'ziggy-js';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme, setTheme } from '../store/theme';
import Nav from '../components/GuestNav';

export default function({title, body}) {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (auth.loggedIn) { // This page is only for UNAUTHENTICATED then IF user is not logged in
      router.visit(route('conversations')) // then redirect to dashboard page.
    }
    return() =>{
      dispatch(getTheme())
    }
  })
  return (
    <>
      <Head title={title} />
      {
        !auth.loggedIn
        ? 
        <div className='w-screen relative'>
          <Nav />
          {body}
        </div>
        : router.visit(route('conversations'))
      }
    </>
  );
} 