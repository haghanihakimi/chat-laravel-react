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
import DeleteMessage from "./alerts/DeleteMessage";
import { toggleDeletePopup, setCurrentchat, togglePinPopup } from "../store/reducers/messages";
import { useDispatch, useSelector } from "react-redux";
import { useListeners } from "../store/actions/listeners";
import { useListenersLeave } from "../store/actions/listeners";
import PinMessage from "./alerts/pinMessage";


export default function({chat, user, host, message, pinned}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [data, setData] = useState({
        popup: false,
    })
    const open = Boolean(anchorEl)
    const messages = useSelector((state) => state.messages)
    const dispatch = useDispatch()
    const {deleteTwoWayMessage} = useListeners()
    const {deleteTwoWayMessageLeave} = useListenersLeave()


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        deleteTwoWayMessage(user)

        return() => {
            deleteTwoWayMessageLeave(user)
        }
    }, [user])


    return(
        <>
            <div className={`w-6 h-6 my-auto rounded-full justify-center items-center cursor-pointer relative ${open ? 'visible opacity-100' : 'invisible opacity-0'} group-hover:opacity-100 transition duration-200 group-hover:visible xxxl:flex xxl:flex xl:flex lg:flex md:flex sm:hidden xs:hidden xxs:hidden`}>
                <button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='w-full h-full rounded-full flex justify-center items-center'>
                    <Options className='w-6 h-6 text-black dark:text-milky-white' />
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
                    <MenuItem onClick={() => { dispatch(setCurrentchat(chat));dispatch(toggleDeletePopup(true));handleClose() } } className="flex flex-row gap-2 items-center justify-start">
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
                        ? <MenuItem onClick={() => { dispatch(setCurrentchat(chat));handleClose() }} className="flex flex-row gap-2 items-center justify-start">
                            <Pin className="w-5 h-5 text-milky-white" />
                            <span className="text-md">
                                Unpin
                            </span>
                        </MenuItem>
                        : <MenuItem onClick={() => { dispatch(setCurrentchat(chat));dispatch(togglePinPopup(true));handleClose() }} className="flex flex-row gap-2 items-center justify-start">
                            <Pin className="w-5 h-5 text-milky-white animate-bounceBubbles" />
                            <span className="text-md">
                                Pin
                            </span>
                        </MenuItem>
                    }
                </Menu>
                {
                    messages.deletePopup
                    ? <DeleteMessage user={user} host={host} />
                    : ''
                }
                {
                    messages.pinPopup
                    ? <PinMessage chat={chat} message={message} host={host} />
                    : ''
                }
            </div>
        </>
    )
}