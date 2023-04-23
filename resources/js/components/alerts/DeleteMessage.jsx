
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toggleDeletePopup } from '../../store/reducers/messages';
import { useDispatch, useSelector } from 'react-redux';


const label = { inputProps: { 'aria-label': 'Unsend for everyone' } };


export default function({isOpen}) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(toggleDeletePopup(false))
    };


    return(
        <>
        <div className='relative'>
            <Dialog
            open={messages.deletePopup}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className='backdrop-blur-lg'
            sx={{ '& .MuiPaper-elevation': { backgroundColor: 'transparent', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px' } }}>
                <DialogTitle className='bg-white dark:bg-black'>
                    <span className='text-black dark:text-milky-white'>
                        Do you want to unsend this message?
                    </span>
                </DialogTitle>

                <DialogContent className='bg-white select-none dark:bg-black'>
                    <DialogContentText id="alert-dialog-slide-description" className='flex flex-row gap-0 items-center justify-start'>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Unsend for everyone" className='text-black dark:text-milky-white' />
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='bg-white select-none px-8 dark:bg-black'>
                    <button className='px-2 py-2 rounded m-0 text-black dark:text-milky-white' onClick={handleClose}>Cancel</button>
                    <button className='px-2 py-2 rounded m-0 text-black mr-4 dark:text-milky-white' onClick={handleClose}>Delete</button>
                </DialogActions>
            </Dialog>
        </div>
        </>
    )
}