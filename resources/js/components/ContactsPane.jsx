import { Link } from "@inertiajs/react"
import { useDispatch, useSelector } from "react-redux"
import route from "ziggy-js"
import ContactsListMenu from "./ContactsListMenu"
import IncomeRequestsMenu from "./IncomeRequestsMenu"
import { setPaneList } from "../store/reducers/contacts"
import FollowersList from "./Contacts/FollowersList"
import FollowingsList from "./Contacts/FollowingsList"
import Requests from "./Contacts/Requests"
import { useRef } from "react"

export default function({}) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    return(
        <>
            <div className="w-full max-w-xs h-screen select-none relative top-0 overflow-auto z-20 bg-white border-r border-black border-opacity-10 shadow-md dark:bg-black dark:border-milky-white dark:border-opacity-10 dark:hover:text-warm-blue">
                {/* Contacts list container */}
                <div className="w-full h-auto relative flex flex-col">
                    {/* List header */}
                    <div className="w-full h-14 flex items-center justify-center relative top-0 left-0 z-10 bg-white border-b border-black border-opacity-10 dark:border-milky-white dark:border-opacity-10 dark:bg-dark-blue">
                        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            <ul className="flex flex-wrap -mb-px">
                                <li>
                                    <button 
                                    onClick={ () => { dispatch(setPaneList('followers')) } }
                                    type="button" 
                                    className={`inline-block p-3 text-sm tracking-wide border-b-2 rounded-t-lg hover:text-blue ${contacts.paneList.followers ? 'text-warm-blue border-warm-blue' : 'border-transparent text-black dark:text-milky-white'} transition duration-150 dark:hover:text-warm-blue`}>
                                        Followers
                                    </button>
                                </li>
                                <li>
                                    <button 
                                    onClick={ () => { dispatch(setPaneList('followings')) } }
                                    type="button" 
                                    className={`inline-block p-3 text-sm tracking-wide border-b-2 rounded-t-lg hover:text-blue ${contacts.paneList.followings ? 'text-warm-blue border-warm-blue' : 'border-transparent text-black dark:text-milky-white'} transition duration-150 dark:hover:text-warm-blue`}>
                                        Followings
                                    </button>
                                </li>
                                <li>
                                    <button 
                                    onClick={ () => { dispatch(setPaneList('requests')); } }
                                    type="button" 
                                    className={`inline-block p-3 border-b-2 ${contacts.paneList.requests ? 'border-warm-blue text-warm-blue' : 'border-transparent text-black dark:text-milky-white'} text-sm tracking-wide rounded-t-lg active transition duration-150 hover:border-warm-blue dark:hover:text-warm-blue hover:text-warm-blue`} aria-current="page">
                                        Requests
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Followers List */}
                    {
                        contacts.paneList.followers ?
                        <FollowersList /> : ''
                    }
                    {/* Followers List */}
                    {
                        contacts.paneList.followings 
                        ? <FollowingsList /> : ''
                    }
                    {/* Requests List */}
                    {
                        contacts.paneList.requests ?
                        <Requests /> : ''
                    }
                </div>
            </div>
        </>
    )
}