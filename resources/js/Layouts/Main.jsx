import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import route from 'ziggy-js';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme, setTheme } from '../store/theme';
import Nav from '../Partials/MainNav';
import LeftSidebar from '../Partials/LeftSidebar';

export default function({title, body}) {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    smallScreen: false,
  })


  useEffect(() => {
    function checkSmallScreen() {
        if (window.innerWidth <= 720) {
            setData({
                smallScreen: true
            }) 
        } else {
            setData({
                smallScreen: false
            }) 
        }
    }
    window.addEventListener('resize', checkSmallScreen)

    return() =>{
      if (auth.loggedIn) {
        router.visit(route('messages'))
      }
      dispatch(setTheme('dark'))
      dispatch(getTheme())
      window.removeEventListener('resize', checkSmallScreen)
    }
  })
  return (
    <>
      <Head title={title} />
      <div className='w-screen relative flex flex-col'>
        {
            data.smallScreen ? <Nav /> : ''
        }
        <div className='w-full relative flex flex-row gap-0 flex-nowrap'>
            <LeftSidebar />
            {body}
        </div>
      </div>
    </>
  );
} 