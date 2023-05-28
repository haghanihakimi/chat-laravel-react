import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme } from '../store/reducers/theme';
import { usePendingRequestsCounter } from '../store/actions/contacts';
import { useGetConversations } from '../store/actions/messages';
import { useListenersLeave } from '../store/actions/listeners';
import Nav from '../components/MainNav';
import LeftSidebar from '../components/LeftSidebar';
import MessagesPane from '../components/MessagesPane'
import NotificationsPane from '../components/NotificationsPane';
import ContactsPane from '../components/ContactsPane';
import SearchPane from '../components/SearchPane';

export default function({auth, host = null, title, body, moment = null}) {
  const messages = useSelector((state) => state.messages)
  const notifications = useSelector((state) => state.notifications)
  const contacts = useSelector((state) => state.contacts)
  const search = useSelector((state) => state.search)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    smallScreen: false,
  })
  const {handlePendingRequestsCounter} = usePendingRequestsCounter(auth ? auth.data : [])
  const {
    incomingFollowListener, 
    cancelFollowRequestListener,
  } = useListenersLeave()
  const {handleUnreadConversationsCounter} = useGetConversations()


  useEffect(() => {
    dispatch(getTheme())
    const checkSmallScreen = () => {
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

    handlePendingRequestsCounter()
    handleUnreadConversationsCounter()

    return() =>{
      dispatch(getTheme())
      incomingFollowListener(auth ? auth.data : [])
      cancelFollowRequestListener(auth ? auth.data : [])
      window.removeEventListener('resize', checkSmallScreen)
      window.removeEventListener('load', checkSmallScreen)
    }
  }, [auth, getTheme])
  return (
    <>
      <Head title={title} />
      <div className='w-full h-screen relative flex flex-col'>
        {
            data.smallScreen ? <Nav className="xxxl:visible xxl:visible xl:visible lg:visible md:visible sm:invisible xs:invisible xsm:invisible" /> : ''
        }
        <div className='w-full h-screen relative flex flex-row gap-0 flex-nowrap'>
            {!data.smallScreen ? <LeftSidebar className="xxxl:visible xxl:visible xl:visible lg:visible md:invisible sm:invisible xs:invisible xsm:invisible" /> : ''}
            { messages.pane ? <MessagesPane moment={moment} auth={auth} /> : '' }
            { notifications.pane ? <NotificationsPane /> : '' }
            { contacts.pane ? <ContactsPane moment={moment} /> : '' }
            { search.pane ? <SearchPane /> : '' }
            <div className='w-full relative h-auto'>
              {body}
            </div>
        </div>
      </div>
    </>
  );
} 