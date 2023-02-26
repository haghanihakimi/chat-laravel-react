import { 
    HiOutlineChatBubbleOvalLeftEllipsis as OutlineMessage, 
    HiChatBubbleOvalLeftEllipsis as FillMessage,
} from "react-icons/hi2";


export default function({}) {
    return(
        <>
            <div className="w-full h-screen max-w-[70px] py-8 flex flex-col justify-between items-center bg-white shadow-lg border-r border-black border-opacity-5 dark:border-milky-white dark:border-opacity-[0.025] dark:bg-black dark:bg-opacity-20">
                <div className="w-12 h-12 shrink-0 bg-green cursor-pointer"></div>
            </div>
        </>
    )
}