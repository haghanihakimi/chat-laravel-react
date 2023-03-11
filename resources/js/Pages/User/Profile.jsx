import { Link } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'
import { 
    HiLockClosed as Lock,
    HiChatBubbleLeft as Message,
    HiUserPlus as Follow
} from "react-icons/hi2";
import ProfileMenu from '../../components/ProfileMenu';

export default function({user}) {

    return(
        <>
            <Layout title={user} body={
                <div className="w-full h-full relative flex flex-col gap-0 z-10 select-none overflow-hidden">
                    <div className='w-full h-full overflow-auto relative flex flex-row gap-0 justify-center items-center'>
                        <div className='w-full max-w-sm h-auto bg-white mx-auto p-4 rounded-lg border border-black border-opacity-10 shadow-lg dark:border-milky-white dark:border-opacity-5 dark:bg-black'>
                            {/* Profile picture & name container */}
                            <div className='w-full relative flex flex-col gap-2 justify-center items-center'>
                                {/* Profile picture image */}
                                <div className='w-24 h-24 rounded-full relative mx-auto p-1 bg-white border border-black border-opacity-10 shadow-md dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5'>
                                    <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                    alt="profile picture"
                                    className="block w-full h-full object-cover rounded-full" />
                                    <Lock className='w-4 h-4 absolute -bottom-[4px] left-0 right-0 mx-auto text-blue shadow-lg' />
                                </div>
                                {/* Profile name */}
                                <h2 className='w-fit h-fit select-text px-4 py-0 block text-black text-base font-semibold tracking-wider dark:text-milky-white'>
                                    User Name
                                </h2>
                            </div>
                            {/* Username text */}
                            <h4 className='w-fit block px-4 py-0 mx-auto text-base text-center select-text font-medium tracking-wide text-black text-opacity-70 dark:text-milky-white dark:text-opacity-70'>
                                @sarahg
                            </h4>
                            {/* Control buttons container */}
                            <div className='w-full flex flex-row gap-1 justify-center items-center py-3'>
                                <button className='w-fit relative rounded bg-blue flex flex-row gap-0 items-center shadow-md text-milky-white tracking-wide text-md px-0 py-0'>
                                    <span className='w-7 h-6 inline-block relative shrink-0 py-1 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
                                        <Follow className='w-4 h-4' />
                                    </span>
                                    <span className='w-fit h-auto inline-block text-center relative px-2 py-1 shrink-0 ml-0 rounded'>
                                        Follow
                                    </span>
                                </button>
                                <Link href='#' className='w-fit relative rounded bg-blue flex flex-row gap-0 items-center shadow-md text-milky-white p-2'>
                                    <Message className='w-4 h-4' />
                                </Link>
                                <div className='w-auto relative rounded bg-blue shadow-md text-milky-white shrink-0'>
                                    <ProfileMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            } />
        </>
    )
}