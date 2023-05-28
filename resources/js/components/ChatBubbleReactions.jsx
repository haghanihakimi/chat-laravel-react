import { Link } from "@inertiajs/react"
import route from "ziggy-js"
import { BsEmojiHeartEyes as Emojies } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useMessageReactions } from "../store/actions/messages";

export default function({chat, host, message, liked, disliked, loved}) {
    let [data, setData] = useState({
        menu: false,
    })
    const wrapper = useRef(null)
    const contacts = useSelector(state => state.contacts)
    const {
        handleMessageReaction
    } = useMessageReactions()

    const reaction = react => {
        handleMessageReaction(chat, message, host, react)
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
            <div
                ref={wrapper} className={`w-4 h-4 my-auto select-none z-10 rounded-full flex-col justify-center items-center cursor-pointer relative ${data.menu ? 'visible opacity-100' : 'invisible opacity-0'} group-hover:opacity-100 transition duration-200 group-hover:visible xxxl:flex xxl:flex xl:flex lg:flex md:flex sm:hidden xs:hidden xxs:hidden`}>
                <button 
                onClick={() => { setData({ menu: !data.menu }); } }
                type="button" 
                className="w-full h-full rounded-full flex justify-center items-center">
                    <Emojies className="w-4 h-4 text-black dark:text-milky-white" />
                </button>
                {
                    data.menu
                    ? 
                    <div className="w-fit shrink-0 py-2 px-4 animate-fadeIn absolute top-5 -left-2 rounded bg-[#616161] z-10 flex flex-row gap-2 shadow-lg">
                        <button disabled={message.reacting} type="button"
                        onClick={() => {reaction('like')}}
                        className={`w-6 h-6 flex justify-center items-center rounded-full disabled:opacity-50 ${liked ? 'bg-milky-white bg-opacity-20 border border-white border-opacity-20' : ''}`}>
                            <span role="img" aria-label="thumbs up">👍</span>
                        </button>
                        <button disabled={message.reacting} type="button"
                        onClick={() => {reaction('dislike')}}
                        className={`w-6 h-6 flex justify-center items-center rounded-full disabled:opacity-50 ${disliked ? 'bg-milky-white bg-opacity-20 border border-white border-opacity-20' : ''}`}>
                            <span role="img" aria-label="thumbs down">👎</span>
                        </button>
                        <button disabled={message.reacting} type="button"
                        onClick={() => {reaction('love')}}
                        className={`w-6 h-6 flex justify-center items-center rounded-full disabled:opacity-50 ${loved ? 'bg-milky-white bg-opacity-20 border border-white border-opacity-20' : ''}`}>
                            <span role="img" aria-label="red heart">❤️️</span>
                        </button>
                    </div>
                    : ''
                }
            </div>
        </>
    )
}