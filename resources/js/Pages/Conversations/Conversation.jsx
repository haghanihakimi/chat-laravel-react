import { Link } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'
import { 
    HiOutlinePaperAirplane as Send,
    HiUser as User,
    HiOutlineCheck as Tick,
} from "react-icons/hi2";
import { useEffect, useRef, useState } from 'react';
import Loading from "../../Partials/Loading"
import ChatMenu from '../../components/ChatMenu';
import { useGetMessages } from '../../store/actions/messages';
import { useSelector } from 'react-redux';

export default function({auth, host, media_forms}) {
    const [data, setData] = useState({
        enableSend: false,
        disablePlaceholder: false,
    })
    const chatRef = useRef(null)
    const conversations = useSelector(state => state.messages)
    const {handleGetMessages} = useGetMessages(host.data.username)

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
            message.innerHTML = "<p class='cursor-text text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50' placeholder='Type Message...'></p>"
        }
        if (message.innerHTML === '<p class="cursor-text text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50" placeholder="Type Message..."><br></p>') {
            message.innerHTML = "<p class='cursor-text text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50' placeholder='Type Message...'></p>"
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

    const convertTime = (time) => {
        return new Date(time).toLocaleString('en-AU', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }

    useEffect(() => {
        if (chatRef.current) {
          const range = document.createRange();
          range.selectNodeContents(chatRef.current);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }

        handleGetMessages(1)
    }, []);

    return(
        <>
            <Layout auth={auth} title='Messages' body={
                <div className="w-full h-full relative flex flex-col gap-0 z-10 overflow-hidden">
                    {/* Top heading bar */}
                    <div className="w-full h-14 bg-white absolute flex flex-row gap-0 justify-between items-center top-0 left-0 z-50 border-b border-black border-opacity-10 dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5">
                        <div className='w-full flex flex-row gap-0 rounded-full px-4'>
                            <div className='w-full h-10 rounded-full relative'>
                                <div className='w-full h-auto flex flex-row gap-0 justify-start relative'>
                                    <Link href={route('profile.view', {username: host.data.username})} className="w-fit h-full inline-flex flex-row gap-2 items-center justify-start">
                                        {
                                            media_forms.host.data
                                            ? <img src={media_forms.host.data.url} 
                                            alt="profile picture"
                                            className="w-10 h-10 rounded-full select-none object-cover shrink-0" />
                                            : <User className='w-10 h-10 select-none m-auto text-blue rounded-full shrink-0 my-auto bg-red' />
                                        }
                                        <span className='text-base font-medium text-black tracking-wide dark:text-milky-white shrink-0'>
                                            {host.data.first_name} {host.data.surname}
                                        </span>
                                    </Link>
                                    <div className='w-fit h-auto select-none relative flex justify-center items-center'>
                                        <ChatMenu request={host.data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Messages body */}
                    <div className='w-full h-full pt-14 relative z-20'>
                        <div className='w-full h-full relative flex flex-col justify-between items-center'>
                            {/* message texts view */}
                            <div className='w-full h-full px-2 py-4 overflow-auto flex flex-col gap-6'>
                                
                                {/* Event alert container */}
                                <div className='w-full flex flex-col gap-0 justify-center items-center'>
                                    {/* Image and name container */}
                                    <div className='flex flex-col gap-2 w-fit h-fit justify-center items-center text-center'>
                                        {
                                            media_forms.host.data
                                            ? <img src={media_forms.host.data.url} 
                                            alt="profile picture"
                                            className="w-16 h-16 select-none rounded-full object-cover shrink-0" />
                                            : <User className='w-10 h-10 select-none m-auto text-blue rounded-full shrink-0 my-auto bg-red' />
                                        }
                                        <strong className='text-base select-text text-center font-semibold tracking-wide text-black dark:text-milky-white'>
                                            {host.data.first_name} {host.data.surname}
                                        </strong>
                                    </div>
                                    {/* alert body text */}
                                    <p className='max-w-[260px] select-text p-2 text-center text-sm text-black text-opacity-75 font-medium dark:text-milky-white dark:text-opacity-75'>
                                        You and {host.data.first_name} are not following each other. Add {host.data.gender === 'female' ? 'her' : 'him'} to see more info on {host.data.gender === 'female' ? 'her' : 'his'} profile.
                                    </p>
                                </div>
                                
                                {
                                    !conversations.loadingMessages
                                    ?
                                    <div className='w-full h-full px-2 py-4 flex flex-col gap-6'>
                                        {/* Receiver Chat bubble */}
                                        {
                                            conversations.messages && conversations.messages.length > 0
                                            ? 
                                            conversations.messages.map(data => {
                                                return data.map(messages => {
                                                    return messages.messages.map((message, index) => {
                                                        return messages.status == "sent"
                                                        ? 
                                                        <div key={index} className="select-text flex items-end justify-start flex-row-reverse gap-2">
                                                            <div className="max-w-[55%] flex flex-col items-end bg-blue bg-opacity-90 p-2 shadow-lg rounded-tr-lg rounded-tl-lg rounded-bl-lg">
                                                                {
                                                                    messages.media_forms && messages.media_forms.length > 0
                                                                    ?
                                                                    <div className='w-full h-auto select-none mb-2 flex flex-row gap-1 flex-wrap'>
                                                                        {
                                                                            messages.media_forms.map((media, imgInex) => {
                                                                                return <img 
                                                                                key={imgInex}
                                                                                src={media.media_path}
                                                                                className='w-full max-w-[200px] min-w-[60px] flex-1 h-auto object-covert rounded shrink-0'
                                                                                />
                                                                            })
                                                                        }
                                                                    </div>
                                                                    : ''
                                                                }
                                                                <p className="text-sm text-white">
                                                                    {message.messages}
                                                                </p>
                                                                <div className='w-full flex flex-row gap-[2px] items-center justify-start'>
                                                                    <span className='rotate-[5deg] mb-[2px] flex flex-row gap-0 items-center' title={`${message.seen_at ? 'seet at ' + convertTime(message.seen_at) : 'delivered at ' + convertTime(message.created_at)}`}>
                                                                        {
                                                                            message.seen_at
                                                                            ? <Tick className='w-4 h-4 text-white' />
                                                                            : <Tick className='w-4 h-4 text-milky-white text-opacity-50' />
                                                                        }
                                                                    </span>
                                                                    <span className="text-xs text-black font-semibold tracking-wide text-opacity-80 dark:text-milky-white dark:text-opacity-80">
                                                                        {convertTime(message.created_at)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : 
                                                        <div key={index} className="select-text flex items-end justify-end flex-row-reverse gap-2">
                                                            <div className="max-w-[50%] flex flex-col items-start bg-white p-2 shadow-lg border border-black border-opacity-5 rounded-tr-lg rounded-tl-lg rounded-br-lg dark:border-milky-white dark:border-opacity-10 dark:bg-black dark:text-milky-white">
                                                                {
                                                                    messages.media_forms && messages.media_forms.length > 0
                                                                    ?
                                                                    <div className='w-full h-auto select-none mb-2 flex flex-row gap-1 flex-wrap'>
                                                                        {
                                                                            messages.media_forms.map((media, imgInex) => {
                                                                                return <img 
                                                                                key={imgInex}
                                                                                src={media.media_path}
                                                                                className='w-full max-w-[200px] min-w-[60px] flex-1 h-auto object-covert rounded shrink-0'
                                                                                />
                                                                            })
                                                                        }
                                                                    </div>
                                                                    : ''
                                                                }
                                                                <p className="text-sm">{message.messages}</p>
                                                                <div className='w-full flex flex-row gap-[2px] items-center justify-start'>
                                                                    <span className="text-xs text-black font-semibold tracking-wide text-opacity-80 dark:text-milky-white dark:text-opacity-80">
                                                                        {convertTime(message.created_at)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                })
                                            })
                                            : 
                                            <div className="select-text flex items-end justify-end flex-row-reverse gap-2">
                                                <div className="max-w-[50%] flex flex-col items-center justify-center bg-black bg-opacity-10 p-2 shadow-lg border border-black border-opacity-5 rounded-tr-lg rounded-tl-lg rounded-br-lg dark:border-milky-white dark:border-opacity-10 dark:bg-black dark:text-milky-white">
                                                    <Loading color={'text-black text-opacity-5 fill-blue'} height={4} width={4} />
                                                </div>
                                                {
                                                    media_forms.host.data
                                                    ? <img src={media_forms.host.data.url} 
                                                    alt="profile picture"
                                                    className="w-4 h-4 ml-1 select-none rounded-full shadow-lg" />
                                                    : <User className='w-4 h-4 select-none m-auto text-blue rounded-full shrink-0 my-auto bg-red' />
                                                }
                                            </div>
                                        }
                                    </div>
                                    :
                                    <div className="w-full flex relative justify-center items-center">
                                        <Loading color={'text-black text-opacity-5 fill-blue'} height={8} width={8} />
                                    </div>
                                }
                                
                            </div>

                            {/* Chat Input container */}
                            <div className='chatInputContainer w-full h-fit p-2 relative p-0 m-0 flex flex-row gap-2 justify-between items-end'>
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
                                className="peer w-full px-4 py-3 bottom-0 bg-white left-0 rounded-md shadow-lg text-base text-black font-medium tracking-wide outline-none border border-black border-opacity-10 ring-transparent ring-4 focus:ring-blue focus:ring-2 dark:border-milky-white dark:text-milky-white dark:border-opacity-10 dark:bg-black dark:focus:bg-dark-blue focus:outline-none focus:ring-0 overflow-auto">
                                    <p className='cursor-text text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50' placeholder='Type Message...'></p>
                                </div>
                                {/* Send button */}
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