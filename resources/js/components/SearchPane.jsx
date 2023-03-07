import { Link } from "@inertiajs/react"
import route from "ziggy-js"
import ContactsMenu from './ContactsListMenu'

export default function({}) {
    return(
        <>
            <div className="w-full max-w-xs h-screen select-none relative overflow-auto overflow-x-hidden z-20 bg-white border-r border-black border-opacity-10 shadow-md dark:bg-black dark:border-milky-white dark:border-opacity-10">
                {/* Searchbar & results container */}
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full h-14 p-2 border-b border-black border-opacity-5 dark:border-milky-white dark:border-opacity-5">
                        <input type="text"
                        placeholder="Search Contacts..."
                        autoFocus
                        className="w-full h-full px-4 py-2 border border-black border-opacity-5 shadow-sm rounded transition duration-150 ring-8 bg-white ring-transparent text-base text-black font-medium tracking-wide outline-none focus:outline-none focus:ring-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5" />
                    </div>
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
                                </div>
                            </Link>
                            <div className="w-fit h-full inline-flex justify-center items-center relative rounded-full my-auto">
                                <ContactsMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}