import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import { 
    AiFillPushpin as PinFill,
    AiOutlinePushpin as PinOutline
 } from "react-icons/ai";
 import { 
    HiOutlinePaperAirplane as Send,
    HiUser as User,
    HiOutlineCheck as Tick,
} from "react-icons/hi2";
import { togglePinMessagesPopup } from '../store/reducers/messages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ChatBubbleMenuSent from '../components/ChatBubbleMenuSent';
import ChatBubbleMenuReceived from '../components/ChatBubbleMenuReceived';
import { Link } from '@inertiajs/react';
import route from 'ziggy-js';

export default function({user, host}) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    return (
        <>
            <div className='relative'>
                <Dialog
                fullWidth={true}
                className='bg-black bg-opacity-40 backdrop-blur-sm transition duration-0'
                sx={{ '& .MuiPaper-elevation': { backgroundColor: 'transparent', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px' } }}
                open={messages.pinMessagesPopup}
                onClose={() => {dispatch(togglePinMessagesPopup(false))}}>
                    <div className='w-full bg-white rounded shadow-lg dark:bg-black'>
                        <DialogTitle className='text-black dark:text-milky-white'>Pinned Messages</DialogTitle>
                        
                        <DialogContent>
                            {
                                messages.pinnedMessages && messages.pinnedMessages.length > 0
                                ?
                                <div className='w-full h-full px-2 py-4 flex flex-col gap-3'>
                                    {
                                        messages.pinnedMessages.map(data => {
                                            return data.messages.map((message, index) => {
                                                return data.status == "sent"
                                                ? 
                                                <div key={index} className='w-full h-full px-2 py-4 flex flex-col gap-3'>
                                                    <p 
                                                    title={moment(message.pinned_at).format("MMM D, YYYY - h:mm A")}
                                                    className='w-full text-center tracking-wider text-xs font-semibold text-opacity-75 text-black dark:text-milky-white dark:text-opacity-75'>
                                                        Pinned {moment(message.pinned_at).fromNow()} ago
                                                    </p>
                                                    <div id={`message-se-${message.id}`} className="select-text flex items-end justify-start flex-row-reverse gap-2 group">
                                                        <div className="max-w-[55%] relative animate-bounceBubbles flex flex-col items-end bg-blue bg-opacity-90 p-2 shadow-lg rounded-tr-lg rounded-tl-lg rounded-bl-lg">
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
                                                            <div className='w-full flex flex-row gap-[2px] items-center justify-end'>
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
                                                        </div>
                                                        <ChatBubbleMenuSent chat={data.id} user={data.sender_id} host={data.recipient_id} message={message.id} pinned={(message.pinned || message.pinned_by == data.sender_id) ? true : false}/>
                                                    </div>
                                                </div>
                                                : 
                                                <div key={index} id={`message-re-${message.id}`} className="select-text flex items-end justify-end flex-row-reverse gap-2 group">
                                                    <ChatBubbleMenuReceived chat={data.id} user={data.recipient_id} host={data.sender_id} message={message.id} pinned={(message.pinned || message.pinned_by) ? true : false} />
                                                    <div className="max-w-[50%] animate-bounceBubbles flex flex-col items-start bg-white p-2 shadow-lg border border-black border-opacity-5 rounded-tr-lg rounded-tl-lg rounded-br-lg dark:border-milky-white dark:border-opacity-10 dark:bg-black dark:text-milky-white">
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
                                                        <Link href={`#message-se-${message.id}`}>{message.messages}</Link>
                                                        <div className='w-full flex flex-row gap-[2px] items-center justify-start'>
                                                            {
                                                                message.pinned || message.pinned_by == data.recipient_id
                                                                ? <PinFill className='text-white w-3 h-3 text-opacity-80 animate-bounceBubbles' />
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
                                                    </div>
                                                </div>
                                            })
                                        })
                                    }

                                </div>
                                :
                                <h3 className='w-full text-center font-semibold text-base tracking-wide text-black text-opacity-60 dark:text-milky-white dark:text-opacity-60'>
                                    No pinned messages found!
                                </h3>
                            }
                            
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => {dispatch(togglePinMessagesPopup(false))}}>Close</Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        </>
    )
}
