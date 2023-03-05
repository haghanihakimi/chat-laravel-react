import { Link } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'

export default function({}) {
    function adjust(event) {
        const message = document.getElementById('message')
        message.style.height = 'auto'
        message.style.height = message.scrollHeight + 'px'
        message.style.maxHeight = '200px'
        if (message.scrollHeight <= 80) {
            message.style.height = '100%' 
        }
    }

    return(
        <>
            <Layout title='Messages' body={
                <div className="w-full h-full relative flex flex-col gap-0 z-10 select-none overflow-hidden">
                    {/* Top heading bar */}
                    <div className="w-full h-14 bg-white absolute flex flex-row gap-0 justify-between items-center top-0 left-0 z-50 border-b border-black border-opacity-10 dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5">
                        <div className='w-fit flex flex-row gap-0 rounded-full px-4'>
                            <div className='w-10 h-10 rounded-full relative'>
                                <Link href="#" className="w-full h-full inline-flex flex-row gap-2 items-center justify-start">
                                    <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                    alt="profile image"
                                    className='w-full h-full rounded-full object-cover' />
                                    <span className='text-base font-medium text-black tracking-wide dark:text-milky-white shrink-0'>
                                        User Name
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Messages body */}
                    <div className='w-full h-full pt-14 bg-transparent relative z-20'>
                        <div className='w-full h-full relative flex flex-col justify-between items-center'>
                            {/* message texts view */}
                            <div className='w-full h-full bg-yellow overflow-auto'>
                                Text view <br />
                            </div>
                            <div className='w-full h-14 bg-green relative'>
                                <textarea 
                                id='message'
                                onInput={() => { adjust() }}
                                className="resize-none w-full h-full p-4" 
                                placeholder="Your message..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            } />
        </>
    )
}