import { useEffect } from "react"
import { 
    HiUser as User,
    HiOutlineXMark as Close,
} from "react-icons/hi2";
import { CgUnblock as Unblock } from "react-icons/cg";
import Loading from "../../Partials/Loading";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import { toggleBlockedUsersPopup } from "../../store/reducers/contacts"
import { useGetBlockedUsers, useUnBlockUser } from "../../store/actions/contacts"

export default ({moment}) => {
    const contacts = useSelector(state => state.contacts)
    const theme = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const {handleGetBlockedUsers} = useGetBlockedUsers()
    const {handleUnBlockUser, unBlockingUser} = useUnBlockUser()

    const descriptionElementRef = useRef(null)
    
    const handleClose = () => {
        dispatch(toggleBlockedUsersPopup(false))
    }

    useEffect(() => {
        if (contacts.blockedUsersPopup) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
              descriptionElement.focus();
            }
            handleGetBlockedUsers()
        }
    }, [])


    return(
        <>
            {
                contacts.blockedUsersPopup
                ? 
                <div className="w-full h-auto relative flex flex-col gap-0 z-0">
                    <Dialog
                    fullWidth={true}
                    open={contacts.blockedUsersPopup}
                    onClose={handleClose}
                    scroll='paper'
                    sx={{ '& .MuiPaper-elevation': { backgroundColor: 'transparent', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px' }, '& .MuiDialogContent-dividers': {borderColor: theme.value === 'dark' ? 'rgba(243, 243, 243, 0.05)' : 'rgba(0, 0, 0, 0.05)'} }}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description">
                        <div className='w-full bg-white rounded shadow-lg dark:bg-black'>
                            <DialogTitle id="scroll-dialog-title" className="text-black dark:text-milky-white flex flex-row justify-between items-center">
                                <span>
                                    Blocked Users
                                </span>
                                <button onClick={handleClose} className="w-6 h-6 flex items-center justify-center">
                                    <Close className="w-5 h-5 text-black dark:text-milky-white" />
                                </button>
                            </DialogTitle>

                            <DialogContent dividers={true}>
                                <div className="w-full relative max-h-[480px]">
                                    {
                                        contacts.blockedUsers && contacts.blockedUsers.length > 0
                                        ? <div className="w-full relative flex flex-col gap-6">
                                            {
                                                !contacts.loadingBlockedUsers
                                                ?
                                                contacts.blockedUsers.map((user, i) => {
                                                    return <div key={i} className="w-full flex flex-row gap-2 justify-start items-center">
                                                        {/* profile image container */}
                                                        <div className="w-12 h-full relative rounded-full shrink-0 select-none">
                                                            <div className="w-12 h-12 relative rounded-full flex items-center justify-center shadow-md">
                                                            {
                                                                user.media_forms && user.media_forms.length > 0
                                                                ?
                                                                <img 
                                                                src={user.media_forms[0].media_path} 
                                                                alt={`${user.firstname} ${user.surname} profile picture`}
                                                                className="block w-full h-full object-cover rounded-full" />
                                                                : <User className='w-12 h-12 m-auto text-blue' />
                                                            }
                                                            </div>
                                                        </div>

                                                        {/* profile data container */}
                                                        <div className="w-full h-auto flex items-center justify-start">
                                                            <h3 className="w-full flex flex-col gap-0 text-md font-medium text-black dark:text-milky-white">
                                                                {user.first_name} {user.surname}
                                                                <span className="text-xs text-black text-opacity-70 dark:text-milky-white dark:text-opacity-70 -translate-y-1">
                                                                    Blocked since {moment(user.pivot.updated_at).format('MMM DD, YYYY')}
                                                                </span>
                                                            </h3>
                                                        </div>

                                                        {/* Button controller container */}
                                                        <form action="/" className="w-fit h-8 my-auto"
                                                        onClick={e => { e.preventDefault();handleUnBlockUser(user.username) }}>
                                                            <button 
                                                            type="submit"
                                                            disabled={unBlockingUser}
                                                            className={`w-fit h-8 px-2 my-auto flex items-center justify-center shadow-md rounded bg-blue ${unBlockingUser ? 'opacity-50' : 'opacity-100'}`}>
                                                                <span className="w-6 h-6 flex items-center justify-end pr-1 border-r border-milky-white border-opacity-20">
                                                                    {
                                                                        unBlockingUser
                                                                        ? <Box sx={{ display: 'flex' }}>
                                                                            <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                                        </Box>
                                                                        : <Unblock className="w-5 h-5 text-milky-white" />
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-milky-white pl-2">
                                                                    Unblock
                                                                </span>
                                                            </button>
                                                        </form>
                                                    </div>
                                                })
                                                : <Loading color={'text-black text-opacity-5 fill-blue'} height={6} width={6} />
                                            }
                                        </div>
                                        : <div className="w-full text-center font-semibold text-base text-black text-opacity-70 dark:text-milky-white dark:text-opacity-70">
                                            No blocked user.
                                        </div>
                                    }
                                </div>
                            </DialogContent>
                        </div>
                    </Dialog>
                </div>
                : ''
            }
        </>
    )
}