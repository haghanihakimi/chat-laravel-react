import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import route from 'ziggy-js';
import { useSelector } from 'react-redux';

export default function({title, body}) {
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    return() =>{
      if (auth.loggedIn) {
        router.visit(route('messages'))
      }
    }
  })
  return (
    <>
      <Head title={title} />
      <div>
        {body}
      </div>
    </>
  );
} 