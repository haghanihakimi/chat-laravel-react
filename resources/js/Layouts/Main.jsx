import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import route from 'ziggy-js';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme, setTheme } from '../store/theme';
import Nav from '../components/MainNav';
import LeftSidebar from '../components/LeftSidebar';
import MessagesPane from '../components/MessagesPane'
import ContactsPane from '../components/ContactsPane';
import SearchPane from '../components/SearchPane';
import Alerts from '../Partials/Alerts';

export default function({title, body}) {
  const auth = useSelector((state) => state.auth)
  const messages = useSelector((state) => state.messages)
  const contacts = useSelector((state) => state.contacts)
  const search = useSelector((state) => state.search)
  const alerts = useSelector((state) => state.alerts)
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
    if (auth.loggedOut) {
      router.visit(route('login'))
    }

    return() =>{
      dispatch(getTheme())
      window.removeEventListener('resize', checkSmallScreen)
      window.removeEventListener('load', checkSmallScreen)
    }
  })
  return (
    <>
      <Head title={title} />
      {
        !auth.loggedOut
        ? 
        <div className='w-full h-screen relative flex flex-col'>
          {
              data.smallScreen ? <Nav className="xxxl:visible xxl:visible xl:visible lg:visible md:visible sm:invisible xs:invisible xsm:invisible" /> : ''
          }
          <div className='w-full h-screen relative flex flex-row gap-0 flex-nowrap'>
              {!data.smallScreen ? <LeftSidebar className="xxxl:visible xxl:visible xl:visible lg:visible md:invisible sm:invisible xs:invisible xsm:invisible" /> : ''}
              { messages.pane ? <MessagesPane /> : '' }
              { contacts.pane ? <ContactsPane /> : '' }
              { search.pane ? <SearchPane /> : '' }
              { alerts.options.status ? <Alerts /> : '' }
              {body}
          </div>
        </div>
        : router.visit(route('login'))
      }
    </>
  );
} 