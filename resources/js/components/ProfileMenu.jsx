import { Link } from "@inertiajs/react"
import route from "ziggy-js"
import { 
    HiEllipsisHorizontal as Menu,
    HiOutlineTrash as OutlineTrash,
    HiNoSymbol as Block,
    HiOutlineUserMinus as OutlineUnfollow,
    HiOutlineXMark as Reject,
} from "react-icons/hi2";
import { GoDiffIgnored as Ignore } from "react-icons/go";
import { CgUnblock as Unblock } from "react-icons/cg";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from "react";
import { useRejectRequest, useMarkSpamRequest, useBlockUser, useUnBlockUser } from "../store/actions/contacts";

export default function({abilities, user}) {
    let [data, setData] = useState({
        menu: false,
    })
    const wrapper = useRef(null)
    const { handleRejectRequest, rejectingRequest } = useRejectRequest(user.username)
    const { handleMarkSpamRequest, ignoringRequest } = useMarkSpamRequest(user.username)
    const { handleBlockUser, blockingUser } = useBlockUser(user.username)
    const { handleUnBlockUser, unBlockingUser } = useUnBlockUser(user.username)

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
                onClick={() => setData({menu: data.menu ? false : true})}
                type="button" 
                className="w-8 h-8 flex justify-center items-center">
                    <Menu className="w-5 h-5 text-milky-white" />
                </button>
                {
                    data.menu ? 
                    <div ref={wrapper} className="min-w-[120px] h-auto bg-white border border-black border-opacity-10 absolute rounded shadow-lg top-9 -right-1 flex flex-col gap-0 animate-fadeIn dark:border-milky-white dark:border-opacity-10 dark:bg-dark-blue">
                        
                        {
                            abilities.canReject
                            ? <form onSubmit={e => { e.preventDefault();handleRejectRequest() } }>
                                <button type='submit' disabled={blockingUser} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${blockingUser ? 'opacity-50' : 'opacity-100'}`}>
                                    <span className='w-4 h-4 inline-block relative shrink-0 p-0 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
                                        {
                                            blockingUser
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
                        {
                            abilities.canMarkSpam
                            ? <form onSubmit={e => { e.preventDefault();handleMarkSpamRequest() } }>
                                <button type='submit' disabled={ignoringRequest} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${ignoringRequest ? 'opacity-50' : 'opacity-100'}`}>
                                    <span className='w-4 h-4 inline-block relative shrink-0 p-0 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
                                        {
                                            ignoringRequest
                                            ? <Box sx={{ display: 'flex' }}>
                                                <CircularProgress style={{color: '#006ce0'}} size={15} />
                                            </Box>
                                            : <Ignore className="w-4 h-4 text-orange my-auto" />
                                        }
                                    </span>
                                    <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                        Ignore
                                    </span>
                                </button>
                            </form>
                            : ''
                        }
                        {
                            abilities.canBlock
                            ? <form onSubmit={e => { e.preventDefault();handleBlockUser() } }>
                                <button type='submit' disabled={blockingUser} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${blockingUser ? 'opacity-50' : 'opacity-100'}`}>
                                    <span className='w-4 h-4 inline-block relative shrink-0 p-0 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
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
                            : <form onSubmit={e => { e.preventDefault();handleUnBlockUser() } }>
                                <button type='submit' disabled={unBlockingUser} className={`w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center ${unBlockingUser ? 'opacity-50' : 'opacity-100'}`}>
                                    <span className='w-4 h-4 inline-block relative shrink-0 p-0 border-r border-milky-white border-opacity-20 flex justify-center items-center'>
                                        {
                                            ignoringRequest
                                            ? <Box sx={{ display: 'flex' }}>
                                                <CircularProgress style={{color: '#006ce0'}} size={15} />
                                            </Box>
                                            : <Unblock className="w-4 h-4 text-green my-auto" />
                                        }
                                    </span>
                                    <span className='text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white'>
                                        Unblock
                                    </span>
                                </button>
                            </form>
                        }
                    </div>
                    : ''
                }
                
            </div>
        </>
    )
}