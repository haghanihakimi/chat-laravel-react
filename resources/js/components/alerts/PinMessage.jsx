import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { togglePinPopup } from '../../store/reducers/messages';
import { usePinOneToOneMessages } from '../../store/actions/messages';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


export default function({chat, message, host}) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        isTwoway: true,
    })
    const {pinOneToOneMessages} = usePinOneToOneMessages()

    const handleClose = () => {
        dispatch(togglePinPopup(false))
    }

    const pinMessage = () => {
        if (!messages.doingAction) {
            pinOneToOneMessages(chat, message, host, data.isTwoway)
            .then(() => {
                handleClose()
            })
        }
    }


    return(
        <>
            <div className='relative'>
                <Dialog
                open={messages.pinPopup}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className='backdrop-blur-lg'
                sx={{ '& .MuiPaper-elevation': { backgroundColor: 'transparent', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px' } }}>
                    <DialogTitle className='bg-white dark:bg-black'>
                        <span className='text-black dark:text-milky-white'>
                            Would you like to pin this message?
                        </span>
                    </DialogTitle>

                    <DialogContent className='bg-white select-none dark:bg-black'>
                        <DialogContentText id="alert-dialog-slide-description" className='flex flex-row gap-0 items-center justify-start'>
                            <FormControlLabel control={<Checkbox disabled={messages.doingAction} checked={data.isTwoway} onChange={ event => { setData({isTwoway: event.target.checked}) } } />} label="Pin for everyone" className='text-black dark:text-milky-white disabled:opacity-50' />
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className='bg-white select-none px-8 dark:bg-black'>
                        <button disabled={messages.doingAction} className='px-2 py-2 rounded m-0 text-black text-opacity-75 dark:text-milky-white disabled:opacity-50' 
                        onClick={() => {handleClose()}}>Cancel</button>
                        <button disabled={messages.doingAction} className='px-2 py-2 rounded m-0 text-blue mr-4 disabled:opacity-50' 
                        onClick={() => {pinMessage()}}>{
                            messages.doingAction ? 'Pinning...' : 'Pin'
                        }</button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}