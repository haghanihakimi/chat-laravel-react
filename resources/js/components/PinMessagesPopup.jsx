import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { togglePinMessagesPopup } from '../store/reducers/messages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { usePinOneToOneMessages } from '../store/actions/messages';

export default function({user, host}) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()
    const {getPinnedOneToOneMessages} = usePinOneToOneMessages()

    useEffect(() => {
        // getPinnedOneToOneMessages(host.data.username)
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
                        <DialogTitle>Pinned Messages</DialogTitle>
                        <DialogContent>
                            <div className='w-full h-full px-2 py-4 flex flex-col gap-3'>
                                <h4 className='text-black dark:text-milky-white'>
                                    You
                                </h4>
                                <div className="select-text flex items-end justify-end flex-row-reverse gap-2 group">
                                    <div className="max-w-[50%] animate-bounceBubbles flex flex-col items-start bg-white p-2 shadow-lg border border-black border-opacity-5 rounded-tr-lg rounded-tl-lg rounded-br-lg dark:border-milky-white dark:border-opacity-10 dark:bg-black dark:text-milky-white">
                                        <p className="text-sm">
                                            Contents    
                                        </p>
                                        <div className='w-full flex flex-row gap-[2px] items-center justify-start'>
                                            {/* <Tooltip
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
                                            </Tooltip> */}
                                        </div>
                                    </div>
                                </div>

                                {/* sender */}
                                <div className="select-text flex items-end justify-start flex-row-reverse gap-2 group">
                                    <div className="max-w-[55%] animate-bounceBubbles flex flex-col items-end bg-blue bg-opacity-90 p-2 shadow-lg rounded-tr-lg rounded-tl-lg rounded-bl-lg">
                                        <p className="text-sm text-white">
                                            Text goes here
                                        </p>
                                        <div className='w-full flex flex-row gap-[2px] items-center justify-end'>
                                            {/* <Tooltip
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
                                            </Tooltip> */}
                                            {/* <Tooltip
                                            sx={{"& .MuiTooltip-tooltip": {marginRight: "24px"}}} 
                                            title={`${message.seen_at ? 'seen at ' + moment(message.seen_at).format("MMM D, YYYY - h:mm A") : 'delivered at ' + moment(message.created_at).format("MMM D, YYYY - h:mm A")}`}>
                                                <span className='rotate-[5deg] mb-[2px] flex flex-row gap-0 items-center'>
                                                    {
                                                        message.seen_at
                                                        ? <Tick className='w-4 h-4 text-white' />
                                                        : <Tick className='w-4 h-4 text-milky-white text-opacity-60' />
                                                    }
                                                </span>
                                            </Tooltip> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
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
