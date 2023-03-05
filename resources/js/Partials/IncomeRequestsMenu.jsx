import { Link } from "@inertiajs/react"
import route from "ziggy-js"
import { 
    HiEllipsisHorizontal as Menu,
    HiNoSymbol as Block,
} from "react-icons/hi2";
import { TfiHandStop as Reject } from "react-icons/tfi";
import { RiSpamLine as Spam } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export default function({}) {
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
                onClick={() => setData({menu: true})}
                type="button" 
                className="w-full h-full rounded-full flex justify-center items-center">
                    <Menu className="w-6 h-6 text-black dark:text-milky-white" />
                </button>
                {
                    data.menu ? 
                    <div ref={wrapper} className="min-w-[140px] h-auto bg-white border border-black border-opacity-10 absolute rounded shadow-lg top-7 right-0 flex flex-col gap-0 dark:border-milky-white dark:border-opacity-10 dark:bg-dark-blue">
                        <button 
                        type="button" className="w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center">
                            <span className="my-auto relative">
                                <Reject className="w-4 h-4 text-orange my-auto" />
                            </span>
                            <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                Reject
                            </span>
                        </button>
                        <button 
                        type="button" className="w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center">
                            <span className="my-auto relative">
                                <Spam className="w-4 h-4 text-orange my-auto" />
                            </span>
                            <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                Spam
                            </span>
                        </button>
                        <button 
                        type="button" className="w-full flex p-2 py-1 text-left flex flex-row gap-2 items-center">
                            <span className="my-auto relative">
                                <Block className="w-4 h-4 text-red my-auto" />
                            </span>
                            <span className="text-left text-sm font-semibold my-auto text-black tracking-wide dark:font-medium dark:text-milky-white">
                                Block User
                            </span>
                        </button>
                    </div>
                    : ''
                }
                
            </div>
        </>
    )
}