import { Link } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../Layouts/Main'
import { 
    HiLockClosed as Lock,
    HiChatBubbleLeft as Message,
    HiUserPlus as Follow,
    HiUser as User,
} from "react-icons/hi2";

export default function({}) {

    return(
        <>
            <Layout title='Unavailable Page' body={
                <div className="w-full h-full relative flex flex-col justify-center items-center gap-0 z-10 select-none overflow-hidden">
                    <h2 className='text-black text-lg font-semibold text-opacity-70 text-center dark:text-milky-white dark:text-opacity-70'>
                        This page is either removed or temporarily unavailable. <br />
                        Please try again later.
                    </h2>
                </div>
            } />
        </>
    )
}