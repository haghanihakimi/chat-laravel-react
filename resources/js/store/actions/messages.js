import { Link, useForm } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages, toggleLoadingMessages } from '../reducers/messages'
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