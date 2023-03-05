import { Link } from "@inertiajs/react"
import { useDispatch, useSelector } from "react-redux"
import route from "ziggy-js"
import ContactsListMenu from "./ContactsListMenu"
import IncomeRequestsMenu from "./IncomeRequestsMenu"
import SentRequests from "./SentRequests"
import { setPaneList } from "../store/contacts"

export default function({}) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    return(
        <>
            <div className="w-full max-w-xs h-screen select-none fixed top-0 left-[70px] overflow-auto z-20 bg-white border-r border-black border-opacity-10 shadow-lg dark:bg-black dark:border-milky-white dark:border-opacity-10 dark:hover:text-warm-blue">
                {/* Contacts list container */}
                <div className="w-full h-auto relative flex flex-col">
                    {/* List header */}
                    <div className="w-full relative top-0 left-0 z-10 bg-white border-b border-black border-opacity-5 dark:border-milky-white dark:border-opacity-10 dark:bg-milky-white dark:bg-opacity-10">
                        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            <ul className="flex flex-wrap -mb-px">
                                <li>
                                    <button 
                                    onClick={ () => { dispatch(setPaneList('contacts')) } }
                                    type="button" 
                                    className={`inline-block p-3 text-sm tracking-wide border-b-2 rounded-t-lg hover:text-blue ${contacts.paneList.contacts ? 'text-warm-blue border-warm-blue' : 'border-transparent text-black dark:text-milky-white'} transition duration-150 dark:hover:text-warm-blue`}>
                                        Contacts
                                    </button>
                                </li>
                                <li>
                                    <button 
                                    onClick={ () => { dispatch(setPaneList('requests')) } }
                                    type="button" 
                                    className={`inline-block p-3 border-b-2 ${contacts.paneList.requests ? 'border-warm-blue text-warm-blue' : 'border-transparent text-black dark:text-milky-white'} text-sm tracking-wide rounded-t-lg active transition duration-150 hover:border-warm-blue dark:hover:text-warm-blue hover:text-warm-blue`} aria-current="page">
                                        Requests
                                    </button>
                                </li>
                                <li>
                                    <button 
                                    onClick={ () => { dispatch(setPaneList('incomeRequests')) } }
                                    type="button" 
                                    className={`inline-block p-3 text-sm tracking-wide border-b-2 rounded-t-lg hover:text-blue hover:border-warm-blue ${contacts.paneList.incomeRequests ? 'border-warm-blue text-warm-blue' : 'border-transparent text-black dark:text-milky-white'} transition duration-150 dark:hover:text-warm-blue`}>
                                        Sent Requests
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Contacts List */}
                    {
                        contacts.paneList.contacts ?
                        <div className="w-full h-auto relative flex flex-col gap-0 z-0">
                            <div className="block border-b border-black border-opacity-5 last:border-none dark:border-milky-white dark:border-opacity-10">
                                <div className="w-full flex flex-row gap-0 pr-2 bg-milky-white transition duration-150 hover:bg-black hover:bg-opacity-10 dark:bg-dark dark:hover:bg-red">
                                    <Link href="#" className="w-full px-4 py-2 flex flex-row gap-0">
                                        {/* Image container */}
                                        <div className="w-12 h-12 shrink-0 rounded-full shadow-md">
                                            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                            alt="profile picture"
                                            className="block w-full h-full object-cover rounded-full" />
                                        </div>
                                        {/* Name container */}
                                        <div className="w-full h-fit flex flex-col relativ px-3 my-auto">
                                            <strong className="w-full max-w-[200px] inline-block text-sm font-semibold tracking-wide truncate text-black dark:text-milky-white">
                                                User Name
                                            </strong>
                                            <span className="text-xs text-black text-opacity-50 -translate-y-1 dark:text-milky-white dark:text-opacity-50">
                                                active 2 hrs ago
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="w-fit h-full inline-flex justify-center items-center relative rounded-full my-auto">
                                        <ContactsListMenu />
                                    </div>
                                </div>
                            </div>
                        </div> : ''
                    }
                    {/* Requests List */}
                    {
                        contacts.paneList.requests ?
                        <div className="w-full h-auto relative flex flex-col gap-0 z-0">
                            <div className="block border-b border-black border-opacity-5 last:border-none dark:border-milky-white dark:border-opacity-10">
                                <div className="w-full flex flex-row gap-0 pr-2 bg-milky-white transition duration-150 hover:bg-black hover:bg-opacity-10 dark:bg-dark dark:hover:bg-red">
                                    <Link href="#" className="w-full px-4 py-2 flex flex-row gap-0">
                                        {/* Image container */}
                                        <div className="w-12 h-12 shrink-0 rounded-full shadow-md">
                                            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                            alt="profile picture"
                                            className="block w-full h-full object-cover rounded-full" />
                                        </div>
                                        {/* Name container */}
                                        <div className="w-full h-fit flex flex-col relativ px-3 my-auto">
                                            <strong className="w-full max-w-[200px] inline-block text-sm font-semibold tracking-wide truncate text-black dark:text-milky-white">
                                                User Name
                                            </strong>
                                            <span className="text-xs text-black text-opacity-50 -translate-y-1 dark:text-milky-white dark:text-opacity-50">
                                                active 2 hrs ago
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="w-fit h-full inline-flex justify-center items-center relative rounded-full my-auto">
                                        <IncomeRequestsMenu />
                                    </div>
                                </div>
                            </div>
                        </div> : ''
                    }
                    {/* Income Requests List */}
                    {
                        contacts.paneList.incomeRequests ?
                        <div className="w-full h-auto relative flex flex-col gap-0 z-0">
                            <div className="block border-b border-black border-opacity-5 last:border-none dark:border-milky-white dark:border-opacity-10">
                                <div className="w-full flex flex-row gap-0 pr-2 bg-milky-white transition duration-150 hover:bg-black hover:bg-opacity-10 dark:bg-dark dark:hover:bg-red">
                                    <Link href="#" className="w-full px-4 py-2 flex flex-row gap-0">
                                        {/* Image container */}
                                        <div className="w-12 h-12 shrink-0 rounded-full shadow-md">
                                            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                            alt="profile picture"
                                            className="block w-full h-full object-cover rounded-full" />
                                        </div>
                                        {/* Name container */}
                                        <div className="w-full h-fit flex flex-col relativ px-3 my-auto">
                                            <strong className="w-full max-w-[200px] inline-block text-sm font-semibold tracking-wide truncate text-black dark:text-milky-white">
                                                User Name
                                            </strong>
                                            <span className="text-xs text-black text-opacity-50 -translate-y-1 dark:text-milky-white dark:text-opacity-50">
                                                active 2 hrs ago
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="w-fit h-full inline-flex justify-center items-center relative rounded-full my-auto">
                                        <SentRequests />
                                    </div>
                                </div>
                            </div>
                        </div> : ''
                    }
                </div>
            </div>
        </>
    )
}