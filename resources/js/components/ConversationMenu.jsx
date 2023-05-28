import { Link } from "@inertiajs/react"
import route from "ziggy-js"
import { 
    HiEllipsisHorizontal as Menu,
    HiNoSymbol as Block,
    HiOutlineCheck as Accept,
    HiXMark as Cancel,
    HiOutlineChatBubbleLeft as Message,
    HiOutlineUserMinus as OutlineUnfollow,
    HiOutlineUserPlus as Follow,
    HiOutlineUser as Profile,
} from "react-icons/hi2";
import { CgUnblock as Unblock } from "react-icons/cg";
import { TfiHandStop as Reject } from "react-icons/tfi";
import { GoDiffIgnored as Ignore } from "react-icons/go";
import { MdOutlineDelete as Delete } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Loading from "../Partials/Loading";
import { useEffect, useRef, useState } from "react";
import { useMenuAbilities, 
    useAcceptRequest, 
    useRejectRequest, 
    useMarkSpamRequest, 
    useBlockUser, 
    useUnBlockUser, 
    useCancelRequest,
    useSendRequest,
    useUnfollow, 
    useRemoveFollower
} from "../store/actions/contacts";
import { useGetConversations } from "../store/actions/messages";
import { useSelector } from "react-redux";

export default function({request, conversation}) {
    let [data, setData] = useState({
        menu: false,
    })
    const wrapper = useRef(null)
    const contacts = useSelector(state => state.contacts)
    const { handleMenuAbilities } = useMenuAbilities(request.username)
    const { handleAcceptRequest, acceptingRequest } = useAcceptRequest(request.username)
    const { handleRejectRequest, rejectingRequest } = useRejectRequest(request.username)
    const { handleCancelRequest, cancellingRequest } = useCancelRequest(request.username)
    const { handleSendRequest, sendingRequest } = useSendRequest(request.username)
    const { handleUnfollow, unFollowing } = useUnfollow(request.username)
    const { handleRemoveFollower, removingFollower } = useRemoveFollower(request.username)
    const { handleMarkSpamRequest, ignoringRequest } = useMarkSpamRequest(request.username)
    const { handleBlockUser, blockingUser } = useBlockUser(request.username)
    const { handleUnBlockUser, unBlockingUser } = useUnBlockUser()
    const {handleRemoveConversation, deletingConversation} = useGetConversations()

    useEffect(() => {
        function hideMenu(event){
            if (wrapper.current && !wrapper.current.contains(event.target)) {
                setData({menu: false})
            }
        }

        document.addEventListener('click', hideMenu, true);
        document.addEventListener('contextmenu', hideMenu, true);
        return () => {
            document.removeEventListener('click', hideMenu, true);
            document.removeEventListener('contextmenu', hideMenu, true);
        };
    }, []);

    return(
        <>
            <div className="w-8 h-8 rounded-full relative shrink-0 select-none">
                <button 
                ref={wrapper}
                onClick={() => { setData({ menu: !data.menu });handleMenuAbilities() } }
                type="button" 
                className="w-full h-full rounded-full flex justify-center items-center">
                    <Menu className="w-6 h-6 text-black dark:text-milky-white" />
                </button>
                {
                    data.menu ? 
                    <div ref={wrapper} className="w-full min-w-[200px] z-10 h-auto bg-white border border-black border-opacity-10 absolute rounded shadow-lg top-9 right-0 flex flex-col gap-0 dark:border-milky-white dark:border-opacity-10 dark:bg-dark-blue">
                        {
                            !contacts.loadingAbilities
                            ?
                            <div className="w-full rounded relative flex flex-col gap-0">
                                {/* accept request button */}
                                <form action="/" method="POST" onSubmit={e => { e.preventDefault();handleRemoveConversation(request.id, conversation) }} className="shrink-0">
                                    <button type='submit' disabled={deletingConversation} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${deletingConversation ? 'opacity-50' : 'opacity-100'}`}>
                                        <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                            {
                                                deletingConversation
                                                ? <Box sx={{ display: 'flex' }}>
                                                    <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                </Box>
                                                : <Delete className="w-4 h-4 text-blue my-auto" />
                                            }
                                        </span>
                                        <span className='text-left text-sm shrink-0 font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                            Delete Conversation
                                        </span>
                                    </button>
                                </form>
                                    
                                {/* accept request button */}
                                {
                                    contacts.abilities.ability.canAccept
                                    ?
                                    <form action="/" method="POST" onSubmit={e => { e.preventDefault();handleAcceptRequest() }}>
                                        <button type='submit' disabled={acceptingRequest} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${acceptingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    acceptingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Accept className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Accept
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* Reject request button */}
                                {
                                    contacts.abilities.ability.canReject
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleRejectRequest() }}>
                                        <button type='submit' disabled={rejectingRequest} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${rejectingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    rejectingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Reject className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Reject
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* Remove follower button */}
                                {
                                    contacts.abilities.ability.canRemove
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleRemoveFollower() }}>
                                        <button type='submit' disabled={removingFollower} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${removingFollower ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    removingFollower
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <OutlineUnfollow className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Remove
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* Follow the user button */}
                                {
                                    contacts.abilities.ability.canFollow
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleSendRequest() }}>
                                        <button type='submit' disabled={sendingRequest} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${sendingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    sendingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Follow className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='txext-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Follow
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* Unfollow the user button */}
                                {
                                    contacts.abilities.ability.canUnfollow
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleUnfollow() }}>
                                        <button type='submit' disabled={unFollowing} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${unFollowing ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    unFollowing
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <OutlineUnfollow className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='txext-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Unfollow
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* cancel the sent request user button */}
                                {
                                    contacts.abilities.ability.canCancelRequest
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleCancelRequest() }}>
                                        <button type='submit' disabled={cancellingRequest} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${cancellingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    cancellingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Cancel className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Cancel
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* mark as spam button */}
                                {
                                    contacts.abilities.ability.canIgnore
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleMarkSpamRequest() }}>
                                        <button type='submit' disabled={ignoringRequest} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${ignoringRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    ignoringRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Ignore className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Ignore
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* block user button */}
                                {
                                    contacts.abilities.ability.canBlock
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleBlockUser() }} className={`${contacts.abilities.ability.canBlock ? 'border-b border-black border-opacity-10 dark:border-milky-white dark:border-opacity-10' : ''}`}>
                                        <button type='submit' disabled={blockingUser} className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${blockingUser ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    blockingUser
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Block className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Block
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* unblock user button */}
                                {
                                    contacts.abilities.ability.canUnblock
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleUnBlockUser(request.username) }} className={`${contacts.abilities.ability.canUnblock ? 'border-b border-black border-opacity-10 dark:border-milky-white dark:border-opacity-10' : ''}`}>
                                        <button type='submit' disabled={unBlockingUser} className={`w-full p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5 ${unBlockingUser ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    unBlockingUser
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Unblock className="w-4 h-4 text-blue my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Unblock
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }

                                {/* View profile link */}
                                {
                                    !contacts.abilities.ability.isBlocked && contacts.abilities.ability.canBlock
                                    ?
                                    <Link href={route('profile.view', {username: request.username})} className="w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5">
                                        <span className="my-auto relative">
                                            <Profile className="w-4 h-4 text-blue my-auto" />
                                        </span>
                                        <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                            Profile
                                        </span>
                                    </Link>
                                    : ''
                                }
                                {/* Message link */}
                                {
                                    !contacts.abilities.ability.isBlocked && contacts.abilities.ability.canBlock
                                    ?
                                    <Link href={route('messages.view', {username: request.username})} className="w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5">
                                        <span className="my-auto relative">
                                            <Message className="w-4 h-4 text-blue my-auto" />
                                        </span>
                                        <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                            Message
                                        </span>
                                    </Link>
                                    : ''
                                }
                            </div>
                            : 
                            <div className="p-1 flex justify-center items-center">
                                <Loading color={'text-black text-opacity-5 fill-blue'} height={5} width={5} />
                            </div>
                        }
                    </div>
                    : ''
                }
                
            </div>
        </>
    )
}