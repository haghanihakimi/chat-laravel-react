import { Link } from "@inertiajs/react"
import route from "ziggy-js"
import { 
    HiEllipsisHorizontal as Menu,
    HiNoSymbol as Block,
} from "react-icons/hi2";
import { RiSpam2Line as Spam } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBlockedUsersPopup, toggleIgnoredUsersPopup } from "../store/reducers/contacts";

export default function({}) {
    let [data, setData] = useState({
        menu: false,
    })
    const wrapper = useRef(null)
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()

    const openBlockedUsers = () => {
        dispatch(toggleBlockedUsersPopup(true))
        setData({
            menu: false,
        })
    }

    const openIgnoredUsers = () => {
        dispatch(toggleIgnoredUsersPopup(true))
        setData({
            menu: false,
        })
    }

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
                onClick={() => { setData({ menu: !data.menu }) } }
                type="button" 
                className="w-full h-full rounded-full flex justify-center items-center">
                    <Menu className="w-6 h-6 text-black dark:text-milky-white" />
                </button>
                {
                    data.menu ? 
                    <div ref={wrapper} className="min-w-[170px] z-10 h-auto bg-white border border-black border-opacity-10 absolute rounded shadow-lg top-10 -right-2 flex flex-col gap-0 dark:border-milky-white dark:border-opacity-10 dark:bg-dark-blue">
                        <div className="relative flex flex-col gap-0">
                            <button 
                            onClick={openBlockedUsers}
                            disabled={contacts.blockedUsersPopup}
                            className={`w-full flex p-2 text-left flex flex-row gap-2 items-center ${contacts.blockedUsersPopup ? 'opacity-50' : 'opacity-100'} bg-transparent transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5`}>
                                <span className="my-auto relative">
                                    <Block className="w-4 h-4 text-blue my-auto" />
                                </span>
                                <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:text-milky-white">
                                    Blocked Users
                                </span>
                            </button>
                            <button 
                            onClick={openIgnoredUsers}
                            disabled={contacts.ignoredUsersPopup} 
                            className={`w-full flex p-2 text-left flex flex-row gap-2 items-center bg-transparent ${contacts.ignoredUsersPopup ? 'opacity-50' : 'opacity-100'} transition duration-250 hover:bg-black hover:bg-opacity-10 dark:hover:bg-milky-white dark:hover:bg-opacity-5`}>
                                <span className="my-auto relative">
                                    <Spam className="w-4 h-4 text-blue my-auto" />
                                </span>
                                <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:text-milky-white">
                                    Ignored Users
                                </span>
                            </button>
                        </div>
                    </div>
                    : ''
                }
                
            </div>
        </>
    )
}