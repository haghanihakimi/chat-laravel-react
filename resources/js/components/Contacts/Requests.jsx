import { Link } from "@inertiajs/react"
import { useDispatch, useSelector } from "react-redux"
import IncomingRequests from "../Contacts/IncomingRequests"
import SentRequests from "./SentRequests"
import { setPaneList } from "../../store/reducers/contacts"

export default ({}) => {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()


    return(
        <>
            <div className="w-full h-auto relative flex flex-col gap-0 z-0">
                <div className="w-full h-10 flex items-center justify-center relative top-0 left-0 z-10 bg-white border-b border-black border-opacity-10 dark:border-milky-white dark:border-opacity-10 dark:bg-dark-blue">
                    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <ul className="flex flex-wrap">
                            <li>
                                <button 
                                onClick={ () => { dispatch(setPaneList('incomingRequests')) } }
                                type="button" 
                                className={`inline-block p-2 text-sm tracking-wide border-b-2 rounded-t-lg hover:text-blue ${contacts.paneList.incomeRequests ? 'text-warm-blue border-warm-blue' : 'border-transparent text-black dark:text-milky-white'} transition duration-150 dark:hover:text-warm-blue`}>
                                    Incoming Requests
                                </button>
                            </li>
                            <li>
                                <button 
                                onClick={ () => { dispatch(setPaneList('sentRequests')) } }
                                type="button" 
                                className={`inline-block p-2 text-sm tracking-wide border-b-2 rounded-t-lg hover:text-blue ${contacts.paneList.sentRequests ? 'text-warm-blue border-warm-blue' : 'border-transparent text-black dark:text-milky-white'} transition duration-150 dark:hover:text-warm-blue`}>
                                    Sent Request
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    contacts.paneList.incomeRequests
                    ?
                    <IncomingRequests />
                    : ''
                }
                {
                    contacts.paneList.sentRequests
                    ?
                    <SentRequests  />
                    : ''
                }
            </div>
        </>
    )
}