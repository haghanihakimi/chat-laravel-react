import { Link, useForm } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { 
    HiLockClosed as Lock,
    HiChatBubbleLeft as Message,
    HiUserPlus as Follow,
    HiUserMinus as OutlineUnfollow,
    HiUser as User,
    HiCheck as Accept,
    HiXMark as Cancel,
} from "react-icons/hi2";
import ProfileMenu from '../../components/ProfileMenu';
import { useState } from 'react';
import { useAcceptRequest, useSendRequest, useCancelRequest, useUnfollow } from '../../store/actions/contacts';
import { setActionOutput } from '../../store/reducers/contacts';
import { useDispatch, useSelector } from 'react-redux';

export default function({user, auth, image, abilities}) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()
    const { handleAcceptRequest, acceptingRequest } = useAcceptRequest(user.username)
    const { handleSendRequest, sendingRequest } = useSendRequest(user.username)
    const { handleCancelRequest, cancellingRequest } = useCancelRequest(user.username)
    const { handleUnfollow, unFollowing } = useUnfollow(user.username)

    return(
        <>
            <Layout user={user} title={user.username} auth={auth} body={
                <div className="w-full h-full relative flex flex-col gap-0 z-10 select-none overflow-hidden">
                    <div className='relative'>
                        <Modal
                        open={contacts.actionOutputs.open}
                        onClose={() => {dispatch(setActionOutput({open: false, header: '', body: ''}))}}
                        aria-describedby="modal-modal-description" className='bg-milky-white bg-opacity-30 dark:bg-dark-blue dark:bg-opacity-30 backdrop-blur-md'>
                            <Box className='bg-white border border-black border-opacity-10 p-2 text-black rounded shadow-lg w-full max-w-sm absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 dark:text-milky-white dark:border-milky-white dark:border-opacity-10 dark:bg-black'>
                                <Typography id="modal-modal-description">
                                    {contacts.actionOutputs.body}
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                    <div className='w-full h-full overflow-auto relative flex flex-row gap-0 justify-center items-center'>
                        <div className='w-full max-w-sm h-auto bg-white mx-auto p-4 rounded-lg border border-black border-opacity-10 shadow-lg dark:border-milky-white dark:border-opacity-5 dark:bg-black'>
                            {/* Profile picture & name container */}
                            <div className='w-full relative flex flex-col gap-2 justify-center items-center'>
                                {/* Profile picture image */}
                                <div className='w-24 h-24 rounded-full relative flex justify-center items-center mx-auto p-1 bg-white border border-black border-opacity-10 shadow-md dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5'>
                                    {
                                        image[0]
                                        ?
                                        <img 
                                        src={image[0].media_path} 
                                        alt={`${user.firstname} ${user.surname} profile picture`}
                                        className="block w-full h-full object-cover rounded-full" />
                                        : <User className='w-16 h-16 m-auto text-blue' />
                                    }
                                    {
                                        user.privacy
                                        ? <Lock className='w-4 h-4 absolute -bottom-[4px] left-0 right-0 mx-auto text-blue shadow-lg' />
                                        : ''
                                    }
                                </div>
                                {/* Profile name */}
                                <h2 className='w-fit h-fit select-text px-4 py-0 block text-black text-base font-semibold tracking-wider dark:text-milky-white'>
                                    {user.first_name} {user.surname}
                                </h2>
                            </div>
                            {/* Username text */}
                            <h4 className='w-fit block px-4 py-0 mx-auto text-base text-center select-text font-medium tracking-wide text-black text-opacity-70 dark:text-milky-white dark:text-opacity-70'>
                                @{user.username}
                            </h4>
                            {/* Control buttons container */}
                            <div className='w-full flex flex-row gap-1 justify-center items-center py-3'>
                                {
                                    abilities.canFollow
                                    ? <form method='POST' onSubmit={e => { e.preventDefault();handleSendRequest(); }} className='w-fit flex flex-row gap-1 justify-center items-center'>
                                        <button type='submit' disabled={sendingRequest} className={`w-fit relative rounded bg-blue flex flex-row gap-0 items-center shadow-md text-milky-white tracking-wide text-md px-0 py-0 ${sendingRequest ? 'opacity-80' : 'opacity-100'}`}>
                                            <span className='w-7 h-6 inline-block relative shrink-0 py-1 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
                                                {
                                                    sendingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#ffffff'}} size={15} />
                                                    </Box>
                                                    : <Follow className='w-4 h-4' />
                                                }
                                            </span>
                                            <span className='w-fit h-auto inline-block text-center relative px-2 py-1 shrink-0 ml-0 rounded'>
                                                Follow
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {
                                    abilities.canCancelRequest
                                    ? <form onSubmit={ e => { e.preventDefault();handleCancelRequest(); } } method='PATCH' className='w-fit flex flex-row gap-1 justify-center items-center'>
                                        <button type='submit' disabled={cancellingRequest} className={`w-fit relative rounded bg-blue flex flex-row gap-0 items-center shadow-md text-milky-white tracking-wide text-md px-0 py-0 ${cancellingRequest ? 'opacity-80' : 'opacity-100'}`}>
                                            <span className='w-7 h-6 inline-block relative shrink-0 py-1 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
                                                {
                                                    cancellingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#ffffff'}} size={15} />
                                                    </Box>
                                                    : <Cancel className='w-4 h-4' />
                                                }
                                            </span>
                                            <span className='w-fit h-auto inline-block text-center relative px-2 py-1 shrink-0 ml-0 rounded'>
                                                Cancel Request
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {
                                    abilities.canAccept
                                    ? <form onSubmit={ e => { e.preventDefault();handleAcceptRequest(); } } method='PATCH' className='w-fit flex flex-row gap-1 justify-center items-center'>
                                        <button type='submit' disabled={acceptingRequest} className={`w-fit relative rounded bg-blue flex flex-row gap-0 items-center shadow-md text-milky-white tracking-wide text-md px-0 py-0 ${acceptingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-7 h-6 inline-block relative shrink-0 py-1 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
                                                {
                                                    acceptingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#ffffff'}} size={15} />
                                                    </Box>
                                                    : <Accept className='w-4 h-4' />
                                                }
                                            </span>
                                            <span className='w-fit h-auto inline-block text-center relative px-2 py-1 shrink-0 ml-0 rounded'>
                                                Accept
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {
                                    abilities.canUnfollow
                                    ? <form onSubmit={e => { e.preventDefault();handleUnfollow(); }} method='PATCH' className='w-fit flex flex-row gap-1 justify-center items-center'>
                                        <button type='submit' disabled={unFollowing} className={`w-fit relative rounded bg-blue flex flex-row gap-0 items-center shadow-md text-milky-white tracking-wide text-md px-0 py-0 ${unFollowing ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-7 h-6 inline-block relative shrink-0 py-1 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
                                                {
                                                    unFollowing
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#ffffff'}} size={15} />
                                                    </Box>
                                                    : <OutlineUnfollow className='w-4 h-4' />
                                                }
                                            </span>
                                            <span className='w-fit h-auto inline-block text-center relative px-2 py-1 shrink-0 ml-0 rounded'>
                                                Unfollow
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {
                                    abilities.canMessage
                                    ? <Link href='#' className='w-fit relative rounded bg-blue flex flex-row gap-0 items-center shadow-md text-milky-white p-2'>
                                        <Message className='w-4 h-4' />
                                    </Link>
                                    : ''
                                }
                                <div className='w-auto relative rounded bg-blue shadow-md text-milky-white shrink-0'>
                                    <ProfileMenu abilities={abilities} user={user} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            } />
        </>
    )
}