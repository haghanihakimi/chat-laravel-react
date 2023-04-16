import { Link, useForm } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux'
import { fillSearchResults, toggleLoading } from '../reducers/search'
import route from 'ziggy-js'
import axios from 'axios'

export function useSearch() {
    const search = useSelector(state => state.search)
    const dispatch = useDispatch()

    async function handleSearch(input)  {
        dispatch(toggleLoading(true))
        try {
            const response = await axios.get(route('user.search'), {params: {keywords: input}})
            dispatch(fillSearchResults(response.data.search))
            dispatch(toggleLoading(false))
        } catch(error) {
            dispatch(toggleLoading(false))
            console.log(error)
        }
    }
    return {handleSearch}
}