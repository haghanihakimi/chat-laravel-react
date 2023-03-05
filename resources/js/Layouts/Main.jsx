import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import route from 'ziggy-js';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme, setTheme } from '../store/theme';
import Nav from '../Partials/MainNav';
import LeftSidebar from '../Partials/LeftSidebar';
import MessagesPane from '../Partials/MessagesPane'
import ContactsPane from '../Partials/ContactsPane';

export default function({title, body}) {
  const auth = useSelector((state) => state.auth)
  const messages = useSelector((state) => state.messages)
  const contacts = useSelector((state) => state.contacts)
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
    window.addEventListener('load', checkSmallScreen)

    return() =>{
      if (auth.loggedIn) {
        router.visit(route('messages'))
      }
      dispatch(getTheme())
      window.removeEventListener('resize', checkSmallScreen)
      window.removeEventListener('load', checkSmallScreen)
    }
  })
  return (
    <>
      <Head title={title} />
      <div className='w-full h-screen relative flex flex-col'>
        {
            data.smallScreen ? <Nav className="xxxl:visible xxl:visible xl:visible lg:visible md:visible sm:invisible xs:invisible xsm:invisible" /> : ''
        }
        <div className='w-full h-screen relative flex flex-row gap-0 flex-nowrap'>
            {!data.smallScreen ? <LeftSidebar className="xxxl:visible xxl:visible xl:visible lg:visible md:invisible sm:invisible xs:invisible xsm:invisible" /> : ''}
            { messages.pane ? <MessagesPane /> : '' }
            { contacts.pane ? <ContactsPane /> : '' }
            {body}
        </div>
      </div>
    </>
  );
} 