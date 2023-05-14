import { Link, useForm } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    setMessages, 
    toggleLoadingMessages, 
    toggleSendingMessage, 
    reduceMessages, 
    fetchNewMessage,
    setPinnedCounter,
    setPinneds,
    togglePinning, 
} from '../reducers/messages'
import route from 'ziggy-js'
import axios from 'axios'

// Get all received messages for the current user
export function useGetMessages(username) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    async function handleGetMessages(input)  {
        dispatch(toggleLoadingMessages(true))
        try {
            const response = await axios.get(route('get.messages', {username: username}), {params: {keywords: input}})
            dispatch(setMessages(response.data.messages))
            dispatch(toggleLoadingMessages(false))
        } catch(error) {
            dispatch(toggleLoadingMessages(false))
            console.log(error)
        }
    }

    return {handleGetMessages}
}

//Delete message function
export function useDeleteMessages(host) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    // Delete single message - one way
    async function deleteSingleMessageOneWay() {
        dispatch(toggleSendingMessage(true))
        try {
            const response = await axios.delete(route('delete.single.message.oneway', {
                chat: messages.data.chat,
                host: host,
            }))
            dispatch(reduceMessages(messages.data.chat))
            dispatch(toggleSendingMessage(false))
        } catch(error) {
            dispatch(toggleSendingMessage(false))
            console.log(error)
        } 
    }

    // Delete received message
    async function removeReceivedMessage() {
        dispatch(toggleSendingMessage(true))
        try {
            const response = await axios.delete(route('remove.received.message', {
                chat: messages.data.chat,
                host: host,
            }))
            console.log(response.data)
            dispatch(reduceMessages(messages.data.chat))
            dispatch(toggleSendingMessage(false))
        } catch(error) {
            dispatch(toggleSendingMessage(false))
            console.log(error)
        } 
    }

    // Delete single message - two way
    async function deleteSingleMessageTwoWay() {
        dispatch(toggleSendingMessage(true))
        
        try {
            const response = await axios.delete(route('delete.single.message.twoway', {
                chat: messages.data.chat,
                host: host,
            }))
            dispatch(reduceMessages(messages.data.chat))
            dispatch(toggleSendingMessage(false))
        } catch(error) {
            dispatch(toggleSendingMessage(false))
            console.log(error)
        } 
    }

    return {
        deleteSingleMessageOneWay,
        removeReceivedMessage,
        deleteSingleMessageTwoWay,
    }
}


/**
 * handle all send message events including one to one, one to many or vice versa
 * @param {*} host 
 * @returns
 */
export function useSendMessages(host) {
    
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    /**
     * Send one to one messages
     * "message" is required. It is typed messages which should be send.
     */
    async function sendOneToOneMessage(message) {
        if (!messages.sendingMessage){
            dispatch(toggleSendingMessage(true))
            try {
                const response = await axios.post(route('send.new.one.to.one.message', {username: host}), {
                    message: message
                })
                dispatch(fetchNewMessage(response.data.messages))
                dispatch(toggleSendingMessage(false))
            } catch(error) {
                dispatch(toggleSendingMessage(false))
                console.log(error)
            } 
        }
    }

    return {
        sendOneToOneMessage,
    }
}

/**
 * Mark one to one messages as "seen"
 * @param {*} host 
 * @returns
 */
export function useMarkAsSeen() {
    
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    /**
     * Send one to one messages
     * "message" is required. It is typed messages which should be send.
     */
    async function markOneToOneMessageAsSeen(host) {
        dispatch(toggleLoadingMessages(true))
        try {
            const response = await axios.post(route('seen.one.to.one.message', {username: host}))
            // console.log(response.data)
            dispatch(toggleLoadingMessages(false))
        } catch(error) {
            dispatch(toggleLoadingMessages(false))
            console.log(error)
        } 
    }

    return {
        markOneToOneMessageAsSeen,
    }
}

/**
 * Pin one to one messages
 * @param {*} host 
 * @returns
 */
export function usePinOneToOneMessages() {
    
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    async function pinOneToOneMessages(chat, message, host, isTwoway) {
        console.log(chat, message, host, isTwoway)
        if (messages.pinnedCounter < 100) {
            try {
                const response = await axios.patch(route('pin.message', {
                    chat: chat,
                    message: message,
                    host: host,
                }), {istwoway: isTwoway})
                dispatch(setPinnedCounter({counter: messages.pinnedCounter + 1, messageId: message}))
                dispatch(togglePinning(false))
                
            } catch(error) {
                dispatch(togglePinning(false))
                console.log(error)
            }
        } else {
            alert("maximum pins exceeded.")
            dispatch(togglePinning(false))
        }
    }

    async function unPinOneToOneMessages(chat, message, host) {
        if (messages.pinnedCounter > 0) {
            try {
                const response = await axios.patch(route('unpin.message', {
                    chat: chat,
                    message: message,
                    host: host,
                }))
                dispatch(setPinnedCounter({counter: messages.pinnedCounter - 1, messageId: message}))
                dispatch(togglePinning(false))
                
            } catch(error) {
                dispatch(togglePinning(false))
                console.log(error)
            }
        } else {
            alert("maximum pins exceeded.")
            dispatch(togglePinning(false))
        }
    }
    
    async function getPinnedOneToOneMessages(username) {
        dispatch(togglePinning(true))
        try {
            const response = await axios.get(route('get.pinned.messages', {username: username}))
            console.log(response.data)
            dispatch(setPinneds(response.data.pinnedMessages))
            dispatch(togglePinning(false))
        } catch(error) {
            dispatch(togglePinning(false))
            console.log(error)
        } 
    }
    
    async function countPinnedOneToOneMessages(username) {
        dispatch(togglePinning(true))
        try {
            const response = await axios.get(route('count.pinned.messages', {username: username}))

            dispatch(setPinnedCounter({counter: response.data.pins}))
            dispatch(togglePinning(false))
        } catch(error) {
            dispatch(togglePinning(false))
            console.log(error)
        } 
    }

    return {
        pinOneToOneMessages,
        unPinOneToOneMessages,
        getPinnedOneToOneMessages,
        countPinnedOneToOneMessages,
    }
}