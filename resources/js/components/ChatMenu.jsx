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
} from "react-icons/hi2";
import { CgUnblock as Unblock } from "react-icons/cg";
import { TfiHandStop as Reject } from "react-icons/tfi";
import { GoDiffIgnored as Ignore } from "react-icons/go";
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
import { useSelector } from "react-redux";

export default function({request}) {
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
    const { handleUnBlockUser, unBlockingUser } = useUnBlockUser(request.username)

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
                    <div ref={wrapper} className="min-w-[140px] z-10 h-auto bg-white border border-black border-opacity-10 absolute rounded shadow-lg top-10 -right-2 flex flex-col gap-0 dark:border-milky-white dark:border-opacity-10 dark:bg-dark-blue">
                        {
                            !contacts.loadingAbilities
                            ?
                            <div className="relative flex flex-col gap-0">
                                {/* accept request button */}
                                {
                                    contacts.abilities.ability.canAccept
                                    ?
                                    <form action="/" method="POST" onSubmit={e => { e.preventDefault();handleAcceptRequest() }}>
                                        <button type='submit' disabled={acceptingRequest} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${acceptingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    acceptingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Accept className="w-4 h-4 text-green my-auto" />
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
                                        <button type='submit' disabled={rejectingRequest} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${rejectingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    rejectingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Reject className="w-4 h-4 text-orange my-auto" />
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
                                        <button type='submit' disabled={removingFollower} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${removingFollower ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    removingFollower
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <OutlineUnfollow className="w-4 h-4 text-orange my-auto" />
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
                                        <button type='submit' disabled={sendingRequest} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${sendingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    sendingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Follow className="w-4 h-4 text-green my-auto" />
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
                                        <button type='submit' disabled={unFollowing} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${unFollowing ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    unFollowing
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <OutlineUnfollow className="w-4 h-4 text-orange my-auto" />
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
                                        <button type='submit' disabled={cancellingRequest} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${cancellingRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    cancellingRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Cancel className="w-4 h-4 text-orange my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Cancel
                                            </span>
                                        </button>
                                    </form>
                                    : ''
                                }
                                {/* Message link */}
                                {
                                    !contacts.abilities.ability.isBlocked && contacts.abilities.ability.canBlock
                                    ?
                                    <Link href={route('messages.view', {username: request.username})} className="w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center">
                                        <span className="my-auto relative">
                                            <Message className="w-4 h-4 text-blue my-auto" />
                                        </span>
                                        <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                            Message
                                        </span>
                                    </Link>
                                    : ''
                                }
                                {/* mark as spam button */}
                                {
                                    contacts.abilities.ability.canIgnore
                                    ?
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleMarkSpamRequest() }}>
                                        <button type='submit' disabled={ignoringRequest} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${ignoringRequest ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    ignoringRequest
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Ignore className="w-4 h-4 text-red my-auto" />
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
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleBlockUser() }}>
                                        <button type='submit' disabled={blockingUser} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${blockingUser ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    blockingUser
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Block className="w-4 h-4 text-red my-auto" />
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
                                    <form method="POST" onSubmit={e => { e.preventDefault();handleUnBlockUser() }}>
                                        <button type='submit' disabled={unBlockingUser} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${unBlockingUser ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className='w-4 h-4 inline-block relative shrink-0 p-0 flex justify-center items-center'>
                                                {
                                                    unBlockingUser
                                                    ? <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress style={{color: '#006ce0'}} size={15} />
                                                    </Box>
                                                    : <Unblock className="w-4 h-4 text-red my-auto" />
                                                }
                                            </span>
                                            <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                                Unblock
                                            </span>
                                        </button>
                                    </form>
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