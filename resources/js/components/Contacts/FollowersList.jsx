import { Link } from "@inertiajs/react"
import axios from "axios"
import { useEffect, useState } from "react"
import route from "ziggy-js"
import ContactsMenu from "../ContactsMenu"
import { 
    HiUser as User,
} from "react-icons/hi2";
import Loading from "../../Partials/Loading"
import { useDispatch, useSelector } from "react-redux"
import { useGetFollowers } from "../../store/actions/contacts"

export default ({}) => {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()
    const {handleGetFollowers} = useGetFollowers()

    useEffect(() => {
        handleGetFollowers()
    }, [])


    return(
        <>
            <div className="w-full h-auto relative flex flex-col gap-0 z-0">
                {
                    contacts.loading
                    ? 
                    <div className="p-4"><Loading color={'text-black text-opacity-5 fill-blue'} height={6} width={6} /></div> 
                    : 
                    <div className="block border-b border-black border-opacity-5 last:border-none dark:border-milky-white dark:border-opacity-10">
                        {
                            contacts.followers && contacts.followers.length > 0
                            ? contacts.followers.map((follower, index) => {
                                return <div key={index} className="w-full flex flex-row gap-0 pr-2 bg-milky-white transition duration-150 hover:bg-black hover:bg-opacity-10 dark:bg-dark dark:hover:bg-red">
                                    <Link href={route('profile.view', {username: follower.username})} className="w-full px-4 py-2 flex flex-row gap-0">
                                        {/* Image container */}
                                        <div className="w-12 h-12 shrink-0 rounded-full shadow-md flex justify-center items-center border border-black border-opacity-10">
                                            {
                                                follower.media_forms && follower.media_forms.length > 0
                                                ? <img src={follower.media_forms[0].media_path} 
                                                alt="profile picture"
                                                className="block w-full h-full object-cover rounded-full" />
                                                : <User className='w-8 h-8 m-auto text-blue' />
                                            }
                                        </div>
                                        {/* Name container */}
                                        <div className="w-full h-fit flex flex-col relativ px-3 my-auto">
                                            <strong className="w-full max-w-[200px] inline-block text-sm font-semibold tracking-wide truncate text-black dark:text-milky-white">
                                                {follower.first_name} {follower.surname}
                                            </strong>
                                            <span className="text-xs text-black text-opacity-50 -translate-y-1 dark:text-milky-white dark:text-opacity-50">
                                                {follower.username}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="w-fit h-full inline-flex justify-center items-center relative rounded-full my-auto">
                                        <ContactsMenu request={follower} />
                                    </div>
                                </div>
                            })
                            : <strong className="w-full max-w-[250px] relative m-auto p-4 text-center flex justify-center items-center text-black text-opacity-50 dark:text-milky-white dark:text-opacity-50">
                                No followers found!
                            </strong>
                        }
                    </div>
                }
            </div>
        </>
    )
}