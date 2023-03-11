import { Link, useForm } from "@inertiajs/react";
import route from "ziggy-js";
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../store/theme';
import { setPane as MessagesPane } from "../store/messages";
import { setPane as ContactsPane } from "../store/contacts";
import { setPane as SearchPane } from "../store/search";
import { setAuth } from "../store/auth";
import { 
    HiOutlineChatBubbleLeftRight as MessagesOuline,
    HiChatBubbleLeftRight as MessagesFill,
    HiOutlineCog6Tooth as SettingsOutline,
    HiOutlineUsers as ContactsOutline,
    HiUsers as ContactsFill,
    HiMagnifyingGlass as Search,
    HiOutlineMoon as DarkMode, 
    HiSun as LightMode,
    HiArrowRightOnRectangle as SignOut,
} from "react-icons/hi2";
import { SiTheconversation } from "react-icons/si";


export default function({}) {
    const theme = useSelector((state) => state.theme.value)
    const messages = useSelector((state) => state.messages)
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
                <div className="w-12 h-auto flex flex-col gap-2 my-auto">
                    {/* Messages */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <button onClick={() => { dispatch(MessagesPane(messages.pane ? false : true)); dispatch(ContactsPane(false)); dispatch(SearchPane(false)); } } 
                        type="button" 
                        className="w-12 h-12 flex justify-center items-center">
                            {
                                messages.pane ?
                                <MessagesFill className={`w-7 h-7 ${messages.pane ? 'text-blue' : 'text-black dark:text-milky-white'}`} />
                                :
                                <MessagesOuline className="w-7 h-7 text-black dark:text-milky-white" />
                            }
                        </button>
                        <span className="inline-block invisible opacity-0 transition duration-150 pointer-events-none w-fit h-fit px-2 py-1 translate-x-[50px] top-0 bottom-0 my-auto absolute rounded bg-white text-black text-sm font-medium shadow-lg border border-black border-opacity-10 dark:text-milky-white dark:bg-black dark:border-milky-white dark:border-opacity-10 group-hover:visible group-hover:opacity-100">
                            Messages
                        </span>
                    </div>
                    {/* Contacts */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <button 
                        onClick={() => { dispatch(ContactsPane(contacts.pane ? false : true)); dispatch(MessagesPane(false)); dispatch(SearchPane(false)) } } 
                        type="button" 
                        className="w-12 h-12 flex justify-center items-center">
                            {
                                contacts.pane ?
                                <ContactsFill className={`w-7 h-7 ${contacts.pane ? 'text-blue' : 'text-black dark:text-milky-white'}`} /> :
                                <ContactsOutline className="w-7 h-7 text-black dark:text-milky-white" />
                            }
                        </button>
                        <span className="inline-block invisible opacity-0 transition duration-150 pointer-events-none w-fit h-fit px-2 py-1 translate-x-[50px] top-0 bottom-0 my-auto absolute rounded bg-white text-black text-sm font-medium shadow-lg border border-black border-opacity-10 dark:text-milky-white dark:bg-black dark:border-milky-white dark:border-opacity-10 group-hover:visible group-hover:opacity-100">
                            Contacts
                        </span>
                    </div>
                    {/* Search system */}
                    <div className="w-12 h-12 shrink-0 cursor-pointer relative group">
                        <button 
                        type="button"
                        onClick={() => {dispatch(SearchPane(search.pane ? false : true)); dispatch(MessagesPane(false)); dispatch(ContactsPane(false))} } 
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
                <div className="w-12 h-auto flex flex-col gap-2 mb-0">
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