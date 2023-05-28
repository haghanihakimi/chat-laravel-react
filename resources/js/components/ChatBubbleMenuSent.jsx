import { 
    HiOutlineEllipsisHorizontal as Options,
    HiTrash as Delete,
    HiArrowUturnRight as Forward
} from "react-icons/hi2";
import { 
    AiFillPushpin as Pin
 } from "react-icons/ai";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { toggleDeletePopup, setData, togglePinPopup, togglePinMessagesPopup } from "../store/reducers/messages";
import { usePinOneToOneMessages } from "../store/actions/messages";
import { useDispatch, useSelector } from "react-redux";


export default function({chat, user, host, message, pinned}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const messages = useSelector((state) => state.messages)
    const dispatch = useDispatch()
    const {unPinOneToOneMessages} = usePinOneToOneMessages()


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        dispatch(setData({
            'chat': chat, 
            'message': message, 
            'sender': user, 
            'receiver': host, 
        }))
    };
    const handleClose = () => {
        setAnchorEl(null)
        dispatch(setData({
            chat: chat, 
            message: message, 
            sender: user, 
            receiver: host, 
        }))
    }

    const unPinMessage = () => {
        unPinOneToOneMessages(chat, message, host)
        handleClose()
    }

    useEffect(() => {
    }, [user])


    return(
        <>
            <div className={`w-6 h-6 my-auto rounded-full justify-center items-center cursor-pointer relative ${open ? 'visible opacity-100' : 'invisible opacity-0'} group-hover:opacity-100 transition duration-200 group-hover:visible xxxl:flex xxl:flex xl:flex lg:flex md:flex sm:hidden xs:hidden xxs:hidden`}>
                <button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => {handleClick(e);}}
                className='w-full h-full rounded-full flex justify-center items-center'>
                    <Options className='w-6 h-6 text-black text-opacity-70 dark:text-milky-white dark:text-opacity-70' />
                </button>
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                sx={{"& .MuiMenu-paper": {minWidth: '100px', padding: '0', color: "#f3f3f3",backgroundColor: "rgba(97, 97, 97, 1.0   )",boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"}}}>
                    <MenuItem onClick={(e) => { dispatch(togglePinMessagesPopup(false));dispatch(toggleDeletePopup({popup: true, option: true}));handleClose(e) } } className="flex flex-row gap-2 items-center justify-start">
                        <Delete className="w-5 h-5 text-milky-white" />
                        <span className="text-md">
                            Remove
                        </span>
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose} className="flex flex-row gap-2 items-center justify-start">
                        <Forward className="w-5 h-5 text-milky-white" />
                        <span className="text-md">
                            Forward
                        </span>
                    </MenuItem> */}
                    {
                        pinned
                        ? <MenuItem onClick={() => { unPinMessage() }} className="flex flex-row gap-2 items-center justify-start">
                            <Pin className="w-5 h-5 text-milky-white" />
                            <span className="text-md">
                                Unpin
                            </span>
                        </MenuItem>
                        : <MenuItem onClick={() => { dispatch(togglePinMessagesPopup(false));dispatch(togglePinPopup(true));handleClose() }} className="flex flex-row gap-2 items-center justify-start">
                            <Pin className="w-5 h-5 text-milky-white animate-bounceBubbles" />
                            <span className="text-md">
                                Pin
                            </span>
                        </MenuItem>
                    }
                </Menu>
                
            </div>
        </>
    )
}