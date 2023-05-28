import { Link } from "@inertiajs/react"
import { useEffect } from "react"
import route from "ziggy-js"
import { GoPrimitiveDot as Circle } from "react-icons/go";
import ConversationMenu from "./ConversationMenu"
import { useGetConversations } from "../store/actions/messages"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../Partials/Loading"

export default function({auth, moment}) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()
    const {handleGetConversations} = useGetConversations()

    const recipient = data => {
        if(data.recipient_user.username !== auth.data.username) {
            return data.recipient_user
        }
        return data.sender_user
    }

    useEffect(() => {
        handleGetConversations(1)

        return() => {
            handleGetConversations(1)
        }
    }, [])


    return(
        <>
            <div className="w-full max-w-xs h-screen select-none relative overflow-auto overflow-x-hidden z-20 bg-white border-r border-black border-opacity-10 shadow-md dark:bg-black dark:border-milky-white dark:border-opacity-10">
                {/* Chats list container */}
                <div className="w-full h-auto flex flex-col">
                    <h2 className="w-full h-14 text-base font-semibold flex items-center justify-center tracking-wider text-black text-center dark:text-milky-white border-b border-black border-opacity-10 dark:border-milky-white dark:border-opacity-5 dark:bg-dark-blue">
                        Conversations
                    </h2>
                    {
                        !messages.loadingConversations
                        ?
                        <div className="w-full h-auto relative">
                            {
                                messages.conversations.length > 0
                                ? messages.conversations.map((conversation, i) => {
                                    return conversation.chats.map((chat, j) => {
                                        return chat.messages.map((message, k) => {
                                            return <div key={k} className="block border-b border-black border-opacity-10 last:border-none dark:border-milky-white dark:border-opacity-10">
                                            <div className="w-full flex flex-row gap-0 pr-2 bg-milky-white transition duration-150 hover:bg-black hover:bg-opacity-10 dark:bg-dark dark:hover:bg-red">
                                                <Link href={route('messages.view', {username: recipient(conversation).username })} 
                                                className="w-full px-4 py-2 flex flex-row items-center justify-center gap-0">
                                                    {/* Image container */}
                                                    <div className="w-12 h-12 shrink-0 rounded-full shadow-md my-auto">
                                                        {
                                                            recipient(conversation).media_forms[0]
                                                            ?
                                                            <img 
                                                            src={recipient(conversation).media_forms[0].media_path} 
                                                            alt={`${recipient(conversation).firstname} ${recipient(conversation).surname} profile picture`}
                                                            className="block w-full h-full object-cover rounded-full" />
                                                            : <User className='w-16 h-16 m-auto text-blue' />
                                                        }
                                                    </div>
                                                    {/* Name container */}
                                                    <div className="w-full h-fit flex flex-col relativ px-3 my-auto">
                                                        <p className={`w-full max-w-[200px] inline-flex flex-row gap-1 items-center text-sm ${(conversation.recipient_user.id === auth.data.id && conversation.seen_at == null) ? 'font-semibold' : 'font-normal'} tracking-wide truncate text-black dark:text-milky-white`}>
                                                            <span>
                                                                {recipient(conversation).first_name} {recipient(conversation).surname}
                                                            </span>
                                                            {
                                                                conversation.recipient_user.id == auth.data.id && !conversation.seen_at
                                                                ? <span className="relative translate-y-[1px]">
                                                                    <Circle className="w-4 h-4 rounded-full text-red" />
                                                                </span>
                                                                : ''
                                                            }
                                                        </p>
                                                        <span className={`text-xs text-black text-opacity-50 ${(conversation.recipient_user.id === auth.data.id && conversation.seen_at == null) ? 'font-semibold' : 'font-normal'} dark:text-milky-white dark:text-opacity-50`}>
                                                            {
                                                                chat.sender_id == auth.data.id ? `You: ${message.messages}` : `${recipient(conversation).username}: ${message.messages}`
                                                            }
                                                        </span>
                                                        <span className={`text-xs text-black text-opacity-50 ${(conversation.recipient_user.id === auth.data.id && conversation.seen_at == null) ? 'font-semibold' : 'font-normal'} dark:text-milky-white dark:text-opacity-50`}>
                                                            {
                                                                moment(conversation.updated_at).fromNow()
                                                            }
                                                        </span>
                                                    </div>
                                                </Link>
                                                <div className="w-fit h-full inline-flex justify-center items-center relative rounded-full my-auto">
                                                    <ConversationMenu request={recipient(conversation)} conversation={conversation.id} />
                                                </div>
                                            </div>
                                        </div>
                                        })
                                    })
                                })
                                : 
                                <h3 className="px-4 py-2 select-text text-base font-semibold text-center text-black text-opacity-70 dark:text-milky-white dark:text-opacity-70">
                                    No conversations found!
                                </h3>
                            }
                        </div>
                        : 
                        <Loading className='w-8 h-8 m-auto' color='text-black text-opacity-10 fill-blue' width={6} height={6} />
                    }
                </div>
            </div>
        </>
    )
}