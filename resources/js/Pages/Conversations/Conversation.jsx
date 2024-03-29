import { Link } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'
import { 
    HiOutlinePaperAirplane as Send,
    HiUser as User,
    HiOutlineCheck as Tick,
} from "react-icons/hi2";
import { 
    AiFillPushpin as PinFill,
    AiOutlinePushpin as PinOutline
 } from "react-icons/ai";
import { useEffect, useRef, useState } from 'react';
import Loading from "../../Partials/Loading"
import ChatMenu from '../../components/ChatMenu';
import { useGetMessages } from '../../store/actions/messages';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';    
import moment from 'moment';
import ChatBubbleMenuSent from '../../components/ChatBubbleMenuSent';
import ChatBubbleMenuReceived from '../../components/ChatBubbleMenuReceived';
import { togglePinMessagesPopup } from '../../store/reducers/messages';
import { useSendMessages } from '../../store/actions/messages';
import { usePinOneToOneMessages } from '../../store/actions/messages';
import { useListeners } from '../../store/actions/listeners';
import { useListenersLeave } from '../../store/actions/listeners';
import PinMessagesPopup from '../../components/PinMessagesPopup';
import { useMenuAbilities } from '../../store/actions/contacts';
import PinMessage from '../../components/alerts/PinMessage'
import DeleteMessage from '../../components/alerts/DeleteMessage'
import ChatBubbleReactions from '../../components/ChatBubbleReactions';

export default function({auth, host, media_forms, abilities}) {
    const [data, setData] = useState({
        enableSend: false,
        disablePlaceholder: false,
    })
    const [PinMessagesPopupComp, setPinMessagesPopupComp] = useState(null)
    const chatRef = useRef(null)
    const chatView = useRef(null)
    const conversations = useSelector(state => state.messages)
    const contacts = useSelector(state => state.contacts)
    const theme = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const {handleGetMessages} = useGetMessages(host.data.username)
    const {sendOneToOneMessage} = useSendMessages(host.data.username)
    const {countPinnedOneToOneMessages} = usePinOneToOneMessages()
    const {handleMenuAbilities} = useMenuAbilities(host.data.username)
    const {
        blockUserListen,
        sendOneToOneMessageListen, 
        deleteTwoWayMessage,
        seenOneToOneMessageListen, 
        messageReactionListen,
        pinMessageListen,
    } = useListeners()
    const {
        blockuserLeave,
        sendOneToOneMessageLeave, 
        deleteTwoWayMessageLeave,
        seenOneToOneMessageLeave, 
        messageReactionLeave,
        pinMessageLeave,
    } = useListenersLeave()

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
        if (message.innerHTML === '<p class="cursor-text text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50" placeholder="Type Message..."><br></p>' && chatRef.current.textContent.length <= 0) {
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
            sendMessage()
        }
    }

    const sendMessage = () => {
        if (!conversations.sendingMessage) {
            const messageElement = chatRef.current.querySelector('p');
            const message = messageElement.textContent;
            sendOneToOneMessage(message)
            chatRef.current.innerHTML = `
            <p class='cursor-text text-black before:text-black before:text-opacity-50 dark:text-milky-white dark:before:text-milky-white dark:before:text-opacity-50' placeholder='Type Message...'></p>
            `;
            if (chatRef.current) {
                const range = document.createRange();
                range.selectNodeContents(chatRef.current);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    moment.relativeTimeThreshold('d', 31);
    moment.updateLocale('en', {
        relativeTime: {
            future: 'in %s ago',
            past: '%s ago',
            s: 'seconds',
            ss: '%d sec',
            m: '1 min',
            mm: '%d mins',
            h: '1hr',
            hh: '%dhrs',
            d:function (number, withoutSuffix, key, isFuture) {
                // Customize the output for days
                var suffix = withoutSuffix ? '' : ' ';
                var unit = number === 1 ? 'day' : 'days';
                return number + suffix + unit;
            },
            M: '1mo',
            MM: '%dmos',
            y: '1yr',
            yy: '%dyrs'
        }
    });



    useEffect(() => {
        if (chatRef.current) {
            const range = document.createRange();
            range.selectNodeContents(chatRef.current);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }

        handleGetMessages(1).then(() => {
            chatView.current.scrollTop = chatView.current.scrollHeight
            countPinnedOneToOneMessages(host.data.username)
            setPinMessagesPopupComp(<PinMessagesPopup user={auth} host={host} />)
            handleMenuAbilities()
        })

        chatView.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
        blockUserListen(auth.data)
        sendOneToOneMessageListen(auth.data, host.data.username)
        messageReactionListen(auth.data)
        deleteTwoWayMessage(auth.data.id)
        seenOneToOneMessageListen(auth.data)
        pinMessageListen(auth.data)

        return() => {
            blockuserLeave(auth.data)
            sendOneToOneMessageLeave(auth.data.id)
            messageReactionLeave(auth.data.id)
            deleteTwoWayMessageLeave(auth.data.id)
            seenOneToOneMessageLeave(auth.data.id)
            pinMessageLeave(auth.data.id)
        }
    }, []);

    return(
        <>
            <Layout auth={auth} host={host.data} title='Messages' moment={moment} body={
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
                                    <div className='w-7 h-7 rounded-full my-auto ml-2'>
                                        <button onClick={() => {dispatch(togglePinMessagesPopup(!conversations.loadingMessages && !conversations.pinning ? true : false));}} className='w-full h-full rounded-full flex justify-center items-center'>
                                            <Badge badgeContent={(conversations.pinnedCounter >= 0) ? conversations.pinnedCounter : 0} 
                                            sx={{"& .MuiBadge-badge": {color: "#f3f3f3",backgroundColor: "#006ce0",width: '24px', height: '24px', borderRadius: '99999px', 'border': theme.value === 'white' ? '2px solid white' : '2px solid #011f44'}}}>
                                                {
                                                    conversations.pinnedCounter && conversations.pinnedCounter > 0
                                                    ? <PinFill className='w-6 h-6 text-blue' />
                                                    : <PinOutline className='w-6 h-6 text-blue' />
                                                }
                                            </Badge>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Messages body */}
                    <div className='w-full h-full pt-14 relative z-20'>
                        <div className='w-full h-full relative flex flex-col justify-between items-center'>
                            {/* message texts view */} 
                            <div ref={chatView} style={{overflowAnchor: 'none'}} className='w-full h-screen px-2 py-4 overflow-auto overflow-x-hidden flex flex-col gap-6 scrollbar-thumb-blue scrollbar-track-blue'>
                                {
                                    !conversations.isBlocked ?
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
                                        {
                                            !abilities.canFollow && abilities.canRemove
                                            ? ''
                                            :
                                            <p className='max-w-[260px] select-text p-2 text-center text-sm text-black text-opacity-75 font-medium dark:text-milky-white dark:text-opacity-75'>
                                                You and {host.data.first_name} are not following each other. Add {host.data.gender === 'female' ? 'her' : 'him'} to see more info on {host.data.gender === 'female' ? 'her' : 'his'} profile.
                                            </p>
                                        }
                                    </div>
                                    : ''
                                }
                                {
                                    !conversations.isBlocked ?
                                    <div className='w-full h-full px-2 py-4 flex flex-col gap-3'>
                                        {
                                            conversations.messages && conversations.messages.length > 0
                                            ? 
                                            conversations.messages.map(data => {
                                                return data.messages.map((message, index) => {
                                                    return data.status == "sent"
                                                    ? 
                                                    // Sent message bubbles
                                                    <div key={index} id={`message-se-${message.id}`} className="select-text flex items-end justify-start flex-row-reverse gap-2 group">
                                                        <div className="max-w-[55%] relative animate-bounceBubbles flex flex-col gap-1 items-end bg-blue bg-opacity-90 p-2 shadow-lg rounded-tr-lg rounded-tl-lg rounded-bl-lg">
                                                            {
                                                                data.media_forms && data.media_forms.length > 0
                                                                ?
                                                                <div className='w-full h-auto select-none mb-2 flex flex-row gap-1 flex-wrap'>
                                                                    {
                                                                        data.media_forms.map((media, imgInex) => {
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
                                                            <div className='w-full flex flex-row gap-[2px] items-center justify-end relative'>
                                                                {
                                                                    message.pinned || message.pinned_by == data.sender_id
                                                                    ? <PinFill className='text-white w-3 h-3 text-opacity-80 animate-bounceBubbles' />
                                                                    : ''
                                                                }
                                                                <Tooltip
                                                                sx={{"& .MuiTooltip-tooltip": {color: "#f3f3f3",backgroundColor: "#ff003b"}}}
                                                                title={`sent ${moment(message.created_at).format("MMM D, YYYY - h:mm A")}`}>
                                                                    <span className="text-xs text-milky-white text-opacity-80 tracking-wide">
                                                                        {
                                                                            moment().diff(message.created_at, 'hours') < 24
                                                                            ?
                                                                            moment(message.created_at).format('h:mm A')
                                                                            : moment(message.created_at).fromNow()
                                                                        }
                                                                    </span>
                                                                </Tooltip>
                                                                <Tooltip
                                                                sx={{"& .MuiTooltip-tooltip": {marginRight: "24px"}}} 
                                                                title={`${message.seen_at ? 'seen at ' + moment(message.seen_at).format("MMM D, YYYY - h:mm A") : 'delivered at ' + moment(message.created_at).format("MMM D, YYYY - h:mm A")}`}>
                                                                    <span className='rotate-[5deg] mb-[2px] flex flex-row gap-0 items-center'>
                                                                        {
                                                                            message.seen_at
                                                                            ? <Tick className='w-4 h-4 text-white' />
                                                                            : <Tick className='w-4 h-4 text-milky-white text-opacity-60' />
                                                                        }
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                            {
                                                                message.reactions.some(reaction => reaction.reaction == 'like' || reaction.reaction == 'dislike' || reaction.reaction == 'love')
                                                                ?
                                                                <div className='w-full p-0 select-none rounded-full relative right-0 flex flex-row gap-2 items-start justify-end'>
                                                                    {
                                                                        message.reactions.filter(reaction => reaction.reaction == 'like').length > 0
                                                                        ?
                                                                        <div className='w-fit h-fit px-1 rounded-full animate-fadeIn bg-black bg-opacity-20 flex flex-row gap-1 justify-center items-center border border-milky-white border-opacity-20'>
                                                                            <span role="img" aria-label="thumbs up" className='animate-fadeInBounce'>👍</span>
                                                                            {
                                                                                message.reactions.filter(reaction => reaction.reaction == 'like').length > 1
                                                                                ? <span className='text-sm text-white'>{message.reactions.filter(reaction => reaction.reaction == 'like').length}</span>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                        : ''
                                                                    }
                                                                    {
                                                                        message.reactions.filter(reaction => reaction.reaction == 'dislike').length > 0
                                                                        ?
                                                                        <div className='w-fit h-fit px-1 rounded-full animate-fadeIn bg-black bg-opacity-20 flex flex-row gap-1 justify-center items-center border border-milky-white border-opacity-20'>
                                                                            <span role="img" aria-label="thumbs down" className='animate-fadeInBounce'>👎</span>
                                                                            {
                                                                                message.reactions.filter(reaction => reaction.reaction == 'dislike').length > 1
                                                                                ? <span className='text-sm text-white'>{message.reactions.filter(reaction => reaction.reaction == 'dislike').length}</span>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                        : ''
                                                                    }
                                                                    {
                                                                        message.reactions.filter(reaction => reaction.reaction == 'love').length > 0
                                                                        ?
                                                                        <div className='w-fit h-fit px-1 rounded-full animate-fadeIn bg-black bg-opacity-20 flex flex-row gap-1 justify-center items-center border border-milky-white border-opacity-20'>
                                                                            <span role="img" aria-label="red heart" className='animate-fadeInBounce'>❤️️</span>
                                                                            {
                                                                                message.reactions.filter(reaction => reaction.reaction == 'love').length > 1
                                                                                ? <span className='text-sm text-white'>{message.reactions.filter(reaction => reaction.reaction == 'love').length}</span>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                        : ''
                                                                    }
                                                                </div>
                                                                : ''
                                                            }
                                                        </div>
                                                        <ChatBubbleMenuSent chat={data.id} user={data.sender_id} host={data.recipient_id} message={message.id} pinned={(message.pinned || message.pinned_by == data.sender_id) ? true : false}/>
                                                        <ChatBubbleReactions chat={data.id} user={data.sender_id} host={data.recipient_id} message={message.id} 
                                                        liked={message.reactions.some(reaction => reaction.user_id == data.sender_id && reaction.reaction == 'like')} 
                                                        disliked={message.reactions.some(reaction => reaction.user_id == data.sender_id && reaction.reaction == 'dislike')} 
                                                        loved={message.reactions.some(reaction => reaction.user_id == data.sender_id && reaction.reaction == 'love')} />
                                                    </div>
                                                    : 
                                                    // received message bubbles
                                                    <div key={index} id={`message-re-${message.id}`} className="select-text flex items-end justify-end flex-row-reverse gap-1 group">
                                                        <ChatBubbleReactions chat={data.id} host={data.sender_id} message={message.id} 
                                                        liked={message.reactions.some(reaction => reaction.user_id == data.recipient_id && reaction.message_id == message.id && reaction.reaction == 'like')} 
                                                        disliked={message.reactions.some(reaction => reaction.user_id == data.recipient_id && reaction.message_id == message.id && reaction.reaction == 'dislike')} 
                                                        loved={message.reactions.some(reaction => reaction.user_id == data.recipient_id && reaction.message_id == message.id && reaction.reaction == 'love')} />
                                                        <ChatBubbleMenuReceived chat={data.id} user={data.recipient_id} host={data.sender_id} message={message.id} pinned={(message.pinned || message.pinned_by) ? true : false} />
                                                        <div className="max-w-[50%] animate-bounceBubbles flex flex-col gap-1 items-start bg-white p-2 shadow-lg border border-black border-opacity-5 rounded-tr-lg rounded-tl-lg rounded-br-lg dark:border-milky-white dark:border-opacity-10 dark:bg-black dark:text-milky-white">
                                                            {
                                                                data.media_forms && data.media_forms.length > 0
                                                                ?
                                                                <div className='w-full h-auto select-none mb-2 flex flex-row gap-1 flex-wrap'>
                                                                    {
                                                                        data.media_forms.map((media, imgInex) => {
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
                                                                {
                                                                    message.pinned || message.pinned_by == data.recipient_id
                                                                    ? <PinFill className='text-black w-3 h-3 text-opacity-80 animate-bounceBubbles dark:text-milky-white dark:text-opacity-80' />
                                                                    : ''
                                                                }
                                                                <Tooltip
                                                                sx={{"& .MuiTooltip-tooltip": {color: "#f3f3f3",backgroundColor: "#ff003b"}}}
                                                                title={`received ${moment(message.created_at).format("MMM D, YYYY - h:mm A")}`}>
                                                                    <span className="text-xs text-black text-opacity-70 tracking-wide dark:text-milky-white dark:text-opacity-70">
                                                                        {
                                                                            moment().diff(message.created_at, 'hours') < 24
                                                                            ?
                                                                            moment(message.created_at).format('h:mm A')
                                                                            : moment(message.created_at).fromNow()
                                                                        }
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                            {
                                                                message.reactions.some(reaction => reaction.reaction == 'like' || reaction.reaction == 'dislike' || reaction.reaction == 'love')
                                                                ?
                                                                <div className='w-full p-0 select-none rounded-full relative right-0 flex flex-row gap-2 items-start justify-start'>
                                                                    {
                                                                        message.reactions.filter(reaction => reaction.reaction == 'like').length > 0
                                                                        ?
                                                                        <div className='w-fit h-fit px-1 rounded-full bg-black bg-opacity-20 flex flex-row gap-1 justify-center items-center border border-milky-white border-opacity-20'>
                                                                            <span role="img" aria-label="thumbs up" className='animate-fadeInBounce'>👍</span>
                                                                            {
                                                                                
                                                                                message.reactions.filter(reaction => reaction.reaction == 'like').length > 1
                                                                                ? <span className='text-sm text-white'>
                                                                                    {message.reactions.filter(reaction => reaction.reaction == 'like').length}
                                                                                </span>
                                                                                : ''
                                                                            }
                                                                        </div> 
                                                                        : ''
                                                                    }
                                                                    {
                                                                        message.reactions.filter(reaction => reaction.reaction == 'dislike').length > 0
                                                                        ?
                                                                        <div className='w-fit h-fit px-1 rounded-full bg-black bg-opacity-20 flex flex-row gap-1 justify-center items-center border border-milky-white border-opacity-20'>
                                                                            <span role="img" aria-label="thumbs down" className='animate-fadeInBounce'>👎</span>
                                                                            {
                                                                                message.reactions.filter(reaction => reaction.reaction == 'dislike').length > 1
                                                                                ? <span className='text-sm text-white'>
                                                                                    {message.reactions.filter(reaction => reaction.reaction == 'dislike').length}
                                                                                </span>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                        : ''
                                                                    }
                                                                    {
                                                                        message.reactions.filter(reaction => reaction.reaction == 'love').length > 0
                                                                        ?
                                                                        <div className='w-fit h-fit px-1 rounded-full bg-black bg-opacity-20 flex flex-row gap-1 justify-center items-center border border-milky-white border-opacity-20'>
                                                                            <span role="img" aria-label="red heart" className='animate-fadeInBounce'>❤️️</span>

                                                                            {
                                                                                message.reactions.filter(reaction => reaction.reaction == 'love').length > 1
                                                                                ? <span className='text-sm text-white'>
                                                                                    {message.reactions.filter(reaction => reaction.reaction == 'love').length}
                                                                                </span>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                        : ''
                                                                    }
                                                                </div>
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                })
                                            })
                                            : 
                                            ''
                                        }
                                    </div>
                                    : ''
                                }
                                
                            </div>

                            {/* Chat Input container */}
                            {
                                !conversations.isBlocked ?
                                <div className='chatInputContainer w-full h-fit p-2 relative p-0 m-0 flex flex-row gap-2 justify-between items-end'>
                                    <div 
                                    contentEditable={!conversations.sendingMessage} 
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
                                            <button 
                                            onClick={sendMessage}
                                            type='button' 
                                            disabled={conversations.sendingMessage}
                                            className='w-full h-full rounded-full flex justify-center items-center'>
                                                {
                                                    conversations.sendingMessage
                                                    ? 
                                                    <Loading color={'text-black text-opacity-5 fill-blue'} height={6} width={6} />
                                                    : 
                                                    <Send className='w-6 h-6 text-blue' />
                                                }
                                            </button>
                                        </div>
                                        : ''
                                    }
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                    {
                        conversations.pinMessagesPopup
                        ? PinMessagesPopupComp
                        : ''
                    }
                    {
                        conversations.deletePopup
                        ? <DeleteMessage user={conversations.data.user} host={conversations.data.receiver} />
                        : ''
                    }
                    {
                        conversations.pinPopup
                        ? <PinMessage chat={conversations.data.chat} message={conversations.data.message} host={conversations.data.receiver} />
                        : ''
                    }
                </div>
            } />
        </>
    )
}