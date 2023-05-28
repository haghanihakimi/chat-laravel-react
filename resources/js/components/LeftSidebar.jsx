import { Link, useForm } from "@inertiajs/react";
import route from "ziggy-js";
import { useSelector, useDispatch } from 'react-redux';
import Badge from '@mui/material/Badge';    
import { setTheme } from '../store/reducers/theme';
import { setPane as MessagesPane } from "../store/reducers/messages";
import { setPane as NotificationsPane } from "../store/reducers/notifications"
import { setPane as ContactsPane } from "../store/reducers/contacts";
import { setPane as SearchPane } from "../store/reducers/search";
import { setAuth } from "../store/reducers/auth";
import { 
    HiOutlineChatBubbleLeftRight as MessagesOuline,
    HiChatBubbleLeftRight as MessagesFill,
    HiOutlineBell as BellOutline,
    HiOutlineBellAlert as ActiveBellOutline,
    HiBell as Bell,
    HiBellAlert as ActiveBell,
    HiOutlineCog6Tooth as SettingsOutline,
    HiOutlineUsers as ContactsOutline,
    HiUsers as ContactsFill,
    HiMagnifyingGlass as Search,
    HiOutlineMoon as DarkMode, 
    HiSun as LightMode,
    HiArrowRightOnRectangle as SignOut,
} from "react-icons/hi2";
import { SiTheconversation } from "react-icons/si";
import { useEffect } from "react";


export default function({}) {
    const theme = useSelector((state) => state.theme.value)
    const messages = useSelector((state) => state.messages)
    const notifications = useSelector((state) => state.notifications)
    const contacts = useSelector((state) => state.contacts)
    const search = useSelector((state) => state.search)
    const dispatch = useDispatch()
    const {post, processing} = useForm({})

    const logout = () => {
        if (!processing) {
            post(route('signout'), {
                onSuccess: () => {
                    // dispatch(setAuth('logout')) 
                }
            })
        }
    }

    useEffect(() => {
    }, [])

    return(
        <>
            <div className="w-full h-screen max-w-[70px] relative z-50 p-2 flex flex-col items-center bg-white shadow-md border-r border-black border-opacity-5 dark:border-milky-white dark:border-opacity-5 dark:bg-black">
                {/* Logo */}
                <div className="w-12 h-auto flex flex-col gap-2 mt-0">
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <Link href={route('root')} className="w-12 h-12 flex justify-center items-center">
                            <SiTheconversation className="w-7 h-7 text-blue" />
                        </Link>
                    </div>
                </div>

                {/* Messages, contacts & dark mode icons */}
                <div className="w-12 h-auto select-none flex flex-col gap-2 my-auto">
                    {/* Messages */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <button onClick={() => { dispatch(MessagesPane(messages.pane ? false : true)); dispatch(NotificationsPane(false)); dispatch(ContactsPane(false)); dispatch(SearchPane(false)); } } 
                        type="button" 
                        className="w-12 h-12 flex justify-center items-center">
                            <Badge badgeContent={messages.unreadConversations} 
                            sx={{"& .MuiBadge-badge": {color: "#f3f3f3",backgroundColor: "#ff003b", right: "2px", top: "4px"}}}>
                            {
                                messages.pane || messages.unreadConversations > 0 ?
                                <MessagesFill className={`w-7 h-7 ${messages.pane || messages.unreadConversations > 0 ? 'text-blue' : 'text-black dark:text-milky-white'}`} />
                                :
                                <MessagesOuline className="w-7 h-7 text-black dark:text-milky-white" />
                            }
                            </Badge>
                        </button>
                        <span className="inline-block invisible opacity-0 transition duration-150 pointer-events-none w-fit h-fit px-2 py-1 translate-x-[50px] top-0 bottom-0 my-auto absolute rounded bg-white text-black text-sm font-medium shadow-lg border border-black border-opacity-10 dark:text-milky-white dark:bg-black dark:border-milky-white dark:border-opacity-10 group-hover:visible group-hover:opacity-100">
                            Messages
                        </span>
                    </div>
                    {/* Notifications */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <button onClick={() => { dispatch(NotificationsPane(notifications.pane ? false : true)); dispatch(ContactsPane(false)); dispatch(MessagesPane(false)); dispatch(SearchPane(false)); } } 
                        type="button" 
                        className="w-12 h-12 flex justify-center items-center">
                            <Badge badgeContent={0} 
                            sx={{"& .MuiBadge-badge": {color: "#f3f3f3",backgroundColor: "#ff003b"}}}>
                                {
                                    notifications.pane ?
                                    <Bell className={`w-7 h-7 ${notifications.pane ? 'text-blue' : 'text-black dark:text-milky-white'}`} />
                                    :
                                    <BellOutline className="w-7 h-7 text-black dark:text-milky-white" />
                                }
                            </Badge>
                        </button>
                        <span className="inline-block invisible opacity-0 transition duration-150 pointer-events-none w-fit h-fit px-2 py-1 translate-x-[50px] top-0 bottom-0 my-auto absolute rounded bg-white text-black text-sm font-medium shadow-lg border border-black border-opacity-10 dark:text-milky-white dark:bg-black dark:border-milky-white dark:border-opacity-10 group-hover:visible group-hover:opacity-100">
                            Messages
                        </span>
                    </div>
                    {/* Contacts */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <button 
                        onClick={() => { dispatch(ContactsPane(contacts.pane ? false : true)); dispatch(MessagesPane(false)); dispatch(NotificationsPane(false)); dispatch(SearchPane(false)) } } 
                        type="button" 
                        className="w-12 h-12 flex justify-center items-center">
                            <Badge badgeContent={contacts.pendingContacts} 
                            sx={{"& .MuiBadge-badge": {color: "#f3f3f3",backgroundColor: "#ff003b"}}}>
                                {
                                    contacts.pane ?
                                    <ContactsFill className={`w-7 h-7 ${contacts.pane ? 'text-blue' : 'text-black dark:text-milky-white'}`} /> :
                                    <ContactsOutline className="w-7 h-7 text-black dark:text-milky-white" />
                                }
                            </Badge>
                        </button>
                        <span className="inline-block invisible opacity-0 transition duration-150 pointer-events-none w-fit h-fit px-2 py-1 translate-x-[50px] top-0 bottom-0 my-auto absolute rounded bg-white text-black text-sm font-medium shadow-lg border border-black border-opacity-10 dark:text-milky-white dark:bg-black dark:border-milky-white dark:border-opacity-10 group-hover:visible group-hover:opacity-100">
                            Contacts
                        </span>
                    </div>
                    {/* Search system */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <button 
                        type="button"
                        onClick={() => {dispatch(SearchPane(search.pane ? false : true)); dispatch(MessagesPane(false)); dispatch(NotificationsPane(false)); dispatch(ContactsPane(false))} } 
                        className="w-12 h-12 flex justify-center items-center">
                            <Search className={`w-7 h-7 ${search.pane ? 'text-blue' : 'text-black dark:text-milky-white'}`} />
                        </button>
                        <span className="inline-block invisible opacity-0 transition duration-150 pointer-events-none w-fit h-fit px-2 py-1 translate-x-[50px] top-0 bottom-0 my-auto absolute rounded bg-white text-black text-sm font-medium shadow-lg border border-black border-opacity-10 dark:text-milky-white dark:bg-black dark:border-milky-white dark:border-opacity-10 group-hover:visible group-hover:opacity-100">
                            Search
                        </span>
                    </div>
                    {/* dark mode */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <button type="button" className="w-12 h-12 flex justify-center items-center"
                        onClick={() => theme === "white" ? dispatch(setTheme('dark')) : dispatch(setTheme('white')) }>
                        {theme === 'white' ? 
                            <DarkMode className='w-7 h-7 text-black animate-fadeInBounce dark:text-milky-white' /> 
                            : <LightMode className='w-6 h-6 text-black animate-fadeInBounce dark:text-milky-white' />
                        }
                        </button>
                    </div>
                </div>

                {/* Signout & settings icons */}
                <div className="w-12 h-auto select-none flex flex-col gap-2 mb-0">
                    {/* Settings Icon */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <Link href={route('settings.view')} className="w-12 h-12 flex justify-center items-center">
                            <SettingsOutline className="w-7 h-7 text-black dark:text-milky-white" />
                        </Link>
                        <span className="inline-block invisible opacity-0 transition duration-150 pointer-events-none w-fit h-fit px-2 py-1 translate-x-[50px] top-0 bottom-0 my-auto absolute rounded bg-white text-black text-sm font-medium shadow-lg border border-black border-opacity-10 dark:text-milky-white dark:bg-black dark:border-milky-white dark:border-opacity-10 group-hover:visible group-hover:opacity-100">
                            Settings
                        </span>
                    </div>
                    {/* Sign Out icon */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <form onSubmit={ e => { e.preventDefault(); logout(); } }>
                            <button
                            type="submit"
                            className="w-12 h-12 flex justify-center items-center">
                                <SignOut className="w-7 h-7 text-black dark:text-milky-white" />
                            </button>
                        </form>
                        <span className="w-fit truncate inline-block invisible opacity-0 transition duration-150 pointer-events-none w-fit h-fit px-2 py-1 translate-x-[50px] top-0 bottom-0 my-auto absolute rounded bg-white text-black text-sm font-medium shadow-lg border border-black border-opacity-10 dark:text-milky-white dark:bg-black dark:border-milky-white dark:border-opacity-10 group-hover:visible group-hover:opacity-100">
                            Sign Out
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}