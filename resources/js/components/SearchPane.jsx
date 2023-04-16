import { Link } from "@inertiajs/react"
import route from "ziggy-js"
import axios from 'axios'
import ContactsMenu from './ContactsMenu'
import debounce from 'lodash/debounce'
import { useState } from "react"
import Loading from "../Partials/Loading"
import { useSearch } from "../store/actions/search"
import { 
    HiUser as User,
} from "react-icons/hi2";
import { useSelector } from "react-redux"

export default function({abilities}) {
    const search = useSelector((state) => state.search)

    const {handleSearch} = useSearch()

    const searchDebounce = debounce((query) => {
        handleSearch(query)
    }, 750);

    const catchInput = e => {
        searchDebounce(e.target.value)
    }

    return(
        <>
            <div className="w-full max-w-xs h-screen select-none relative overflow-auto overflow-x-hidden z-20 bg-white border-r border-black border-opacity-10 shadow-md dark:bg-black dark:border-milky-white dark:border-opacity-10">
                {/* Searchbar & results container */}
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full h-14 p-2 border-b border-black border-opacity-5 dark:border-milky-white dark:border-opacity-5">
                        <input type="text"
                        placeholder="Search Contacts..."
                        autoFocus
                        spellCheck='false'
                        onInput={ catchInput }
                        className="w-full h-full px-4 py-2 border border-black border-opacity-5 shadow-sm rounded transition duration-150 ring-8 bg-white ring-transparent text-base text-black font-medium tracking-wide outline-none focus:outline-none focus:ring-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5" />
                    </div>
                    {
                        search.loading
                        ? <Loading className='w-8 h-8 m-auto' color='text-black text-opacity-10 fill-blue' width={6} height={6} /> 
                        : 
                        <div className="w-full h-auto flex flex-col gap-0">
                            {
                                search.searchResults && search.searchResults.length > 0
                                ? 
                                search.searchResults.map(user => {
                                    return <div key={user.id} className="block border-b border-black border-opacity-5 last:border-none dark:border-milky-white dark:border-opacity-10">
                                        <div className="w-full flex flex-row gap-0 pr-2 bg-milky-white transition duration-150 hover:bg-black hover:bg-opacity-10 dark:bg-dark dark:hover:bg-red">
                                            {
                                                user.is_blocked || user.blocked
                                                ?
                                                <div className="w-full px-4 py-2 flex flex-row gap-0 opacity-50">
                                                    {/* Image container */}
                                                    <div className='w-12 h-12 shrink-0 rounded-full shadow-md flex justify-center items-center border border-black border-opacity-10'>
                                                        {
                                                            user.media_forms && user.media_forms.length > 0
                                                            ? <img src={user.media_forms[0].media_path} 
                                                            alt="profile picture"
                                                            className="block w-full h-full object-cover rounded-full" />
                                                            : <User className='w-8 h-8 m-auto text-blue' />
                                                        }
                                                    </div>
                                                    {/* Name container */}
                                                    <div className="w-full h-fit flex flex-col relative px-3 my-auto">
                                                        <strong className="w-full max-w-[200px] inline-block text-sm font-semibold tracking-wide truncate text-black dark:text-milky-white">
                                                            {user.first_name} {user.surname}
                                                        </strong>
                                                        <span className='-translate-y-[3px] text-sm tracking-wide font-medium text-black text-opacity-50 dark:text-milky-white dark:text-opacity-50'>
                                                            Unavailable
                                                        </span>
                                                    </div>
                                                </div>
                                                : 
                                                <Link href={route('profile.view', {username: user.username})} className="w-full px-4 py-2 flex flex-row gap-0">
                                                    {/* Image container */}
                                                    <div className='w-12 h-12 shrink-0 rounded-full shadow-md flex justify-center items-center border border-black border-opacity-10'>
                                                        {
                                                            user.media_forms && user.media_forms.length > 0
                                                            ? <img src={user.media_forms[0].media_path} 
                                                            alt="profile picture"
                                                            className="block w-full h-full object-cover rounded-full" />
                                                            : <User className='w-8 h-8 m-auto text-blue' />
                                                        }
                                                    </div>
                                                    {/* Name container */}
                                                    <div className="w-full h-fit flex flex-col relative px-3 my-auto">
                                                        <strong className="w-full max-w-[200px] inline-block text-sm font-semibold tracking-wide truncate text-black dark:text-milky-white">
                                                            {user.first_name} {user.surname}
                                                        </strong>
                                                        <span className='-translate-y-[3px] text-sm tracking-wide font-medium text-black text-opacity-50 dark:text-milky-white dark:text-opacity-50'>
                                                            @{user.username}
                                                        </span>
                                                    </div>
                                                </Link>
                                            }
                                            <div className="w-fit h-full inline-flex justify-center items-center relative rounded-full my-auto">
                                                <ContactsMenu request={user} />
                                            </div>
                                        </div>
                                    </div>
                                })
                                : 
                                <strong className="w-full px-4 py-2 text-center font-semibold tracking-wide text-black text-opacity-60 dark:text-milky-white dark:text-opacity-60">
                                    No result found...
                                </strong>
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}