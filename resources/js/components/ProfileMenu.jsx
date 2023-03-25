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
import { useEffect, useRef, useState } from "react";

export default function({abilities}) {
    let [data, setData] = useState({
        menu: false,
    })
    const wrapper = useRef(null)

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
                            ? <form>
                                <button 
                                type="button" className="w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center">
                                    <span className="my-auto relative">
                                        <Reject className="w-4 h-4 text-orange my-auto" />
                                    </span>
                                    <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                        Reject
                                    </span>
                                </button>
                            </form>
                            : ''
                        }
                        {
                            abilities.canMarkSpam
                            ? <form>
                                <button 
                                type="button" className="w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center">
                                    <span className="my-auto relative">
                                        <Ignore className="w-4 h-4 text-red my-auto" />
                                    </span>
                                    <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                        Ignore
                                    </span>
                                </button>
                            </form>
                            : ''
                        }
                        {
                            abilities.canBlock
                            ? <form>
                                <button 
                                type="button" className="w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center">
                                    <span className="my-auto relative">
                                        <Block className="w-4 h-4 text-red my-auto" />
                                    </span>
                                    <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                        Block
                                    </span>
                                </button>
                            </form>
                            : <form>
                                <button 
                                type="button" className="w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center">
                                    <span className="my-auto relative">
                                        <Block className="w-4 h-4 text-blue my-auto" />
                                    </span>
                                    <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
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