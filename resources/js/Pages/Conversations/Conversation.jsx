import { Link } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'
import { 
    HiOutlinePaperAirplane as Send,
} from "react-icons/hi2";
import { useEffect, useRef, useState } from 'react';

export default function({}) {
    const [data, setData] = useState({
        enableSend: false,
        disablePlaceholder: false,
    })
    const chatRef = useRef(null)

    const adjust = () => {
        const message = document.getElementById('message')
        message.style.height = 'auto'
        message.style.height = message.scrollHeight + 'px'
        message.style.maxHeight = '250px'
        if (message.scrollHeight <= 80) {
            message.style.height = 'auto' 
        }
        if (message.innerHTML.length > 0) {
            setData({
                enableSend: true
            })
        } else {
            setData({
                enableSend: false
            })
            message.innerHTML = "<p class='text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50' placeholder='Type Message...'></p>"
        }
        if (message.innerHTML === '<p class="text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50" placeholder="Type Message..."><br></p>') {
            message.innerHTML = "<p class='text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50' placeholder='Type Message...'></p>"
            setData({
                enableSend: false
            })
        }
        // message.innerHTML.replace(/<\/p><p>/g, '<br>')
    }

    const lockEnter = event => {
        if (!event.shiftKey && event.keyCode === 13) {
            event.preventDefault()
        }
    }

    useEffect(() => {
        if (chatRef.current) {
          const range = document.createRange();
          range.selectNodeContents(chatRef.current);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
    }, []);

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
                            <div className='w-full h-full bg-transparent px-2 py-4 overflow-auto'>
                                
                                
                                <div className="flex items-end justify-start mb-4">
                                    <img className="w-6 h-6 mr-1 rounded-full" src="https://via.placeholder.com/50" alt="User Avatar"/>
                                    <div className="flex flex-col items-end bg-blue p-4 rounded-lg">
                                        <p className="text-sm text-white">Hi! How can I help you?</p>
                                        <span className="text-xs text-white">12:05 pm</span>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end mb-4">
                                    <div className="flex flex-col items-start bg-black bg-opacity-20 p-4 rounded-lg">
                                        <p className="text-sm">Hello there!</p>
                                        <span className="text-xs text-gray-600">12:00 pm</span>
                                    </div>
                                    <img className="w-6 h-6 ml-1 rounded-full" src="https://via.placeholder.com/50" alt="User Avatar"/>
                                </div>

                            </div>
                            <div className='w-full h-fit p-2 relative p-0 m-0 flex flex-row gap-2 justify-between items-end'>
                                <div 
                                    contentEditable="true" 
                                    suppressContentEditableWarning={true}
                                    role="textbox" 
                                    spellCheck="true" 
                                    tabIndex="0"
                                    id='message'
                                    onInput={() => { adjust() }}
                                    onKeyDown={lockEnter}
                                    style={{padding: '12px !important'}}
                                    ref={chatRef}
                                    className="w-full px-4 py-3 bottom-0 bg-white left-0 rounded-xl shadow-lg text-base text-black font-medium tracking-wide outline-none border border-black border-opacity-10 ring-transparent ring-4 focus:ring-blue focus:ring-2 dark:border-milky-white dark:text-milky-white dark:border-opacity-10 dark:bg-black dark:focus:bg-dark-blue focus:outline-none focus:ring-0 overflow-auto">
                                    <p className='text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50' placeholder='Type Message...'></p>
                                </div>
                                {
                                    data.enableSend ? 
                                    <div className='w-12 h-12 rounded-full bg-white animate-fadeInBounce dark:bg-dark-blue'>
                                        <button type='button' className='w-full h-full rounded-full flex justify-center items-center'>
                                            <Send className='w-6 h-6 text-blue' />
                                        </button>
                                    </div>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            } />
        </>
    )
}