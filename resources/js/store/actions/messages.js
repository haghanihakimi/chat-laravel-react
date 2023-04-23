import { Link, useForm } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages, toggleLoadingMessages, toggleDoingAction, reduceMessages } from '../reducers/messages'
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
            dispatch(setMessages(response.data))
            dispatch(toggleLoadingMessages(false))
        } catch(error) {
            dispatch(toggleLoadingMessages(false))
            console.log(error)
        }
    }

    return {handleGetMessages}
}

//Delete message function
export function useDeleteMessages(chat, user, host) {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    // Delete single message - one way
    async function deleteSingleMessageOneWay() {
        dispatch(toggleDoingAction(true))
        try {
            const response = await axios.delete(route('delete.single.message.oneway', {
                chat: chat,
                user: user,
                host: host,
            }))
            // dispatch(fillSearchResults(response.data.search))
            // dispatch(toggleDoingAction(false))
            dispatch(reduceMessages(chat))
            console.log(response)
        } catch(error) {
            dispatch(toggleDoingAction(false))
            console.log(error)
        } 
    }

    // Delete single message - two way
    async function deleteSingleMessageTwoWay() {
        dispatch(toggleDoingAction(true))
        try {
            const response = await axios.delete(route('delete.single.message.twoway', {
                chat: chat,
                user: user,
                host: host,
            }))
            // dispatch(fillSearchResults(response.data.search))
            // dispatch(toggleDoingAction(false))
            dispatch(reduceMessages(chat))
            console.log(response)
        } catch(error) {
            dispatch(toggleDoingAction(false))
            console.log(error)
        } 
    }

    return {
        deleteSingleMessageOneWay,
        deleteSingleMessageTwoWay,
    }
}