import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import route from 'ziggy-js';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme, setTheme } from '../store/theme';
import Nav from '../Partials/GuestNav';

export default function({title, body}) {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    return() =>{
      if (auth.loggedIn) {
        router.visit(route('messages'))
      }
      dispatch(getTheme())
    }
  })
  return (
    <>
      <Head title={title} />
      <div className='w-screen relative'>
        <Nav />
        {body}
      </div>
    </>
  );
} 