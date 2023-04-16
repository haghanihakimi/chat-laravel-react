import { Link, useForm } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux'
import { setActionOutput, 
    setLoading, 
    toggleLoadingAbilities,
    fillFollowerRequests, 
    fillSentRequests, 
    fillFollowers, 
    fillFollowings, 
    setAbilities,
    removeFollowerFromList,
    removeFollowingUserFromList,
    removeFollowerRequest, 
    removeFollowingRequest
} from '../reducers/contacts'
import route from 'ziggy-js'
import axios from 'axios'

//Get Menu abilities
export function useMenuAbilities(username) {
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()

    async function handleMenuAbilities() {
        dispatch(toggleLoadingAbilities(true))
        try {
            if(contacts.abilities.user !== username) {
                const response = await axios.get(route('user.abilities', {username: username}))
                dispatch(setAbilities(response.data))
            }
            dispatch(toggleLoadingAbilities(false))
        } catch (error) {
            dispatch(toggleLoadingAbilities(false))
            console.log(error)
        }
    }
    return {handleMenuAbilities}
}

// Accept incoming follow request
export function useAcceptRequest(username) {
    const dispatch = useDispatch()
    const { data: acceptRequestData, patch: acceptRequest, processing: acceptingRequest, errors: acceptRequestErrors } = useForm({})

    function handleAcceptRequest (){ 
        if (!acceptingRequest) {
            acceptRequest(route('accept.follow.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.acceptRequest
                    }))
                }
            })
        }
    }

    return { handleAcceptRequest, acceptRequestData, acceptingRequest, acceptRequestErrors }
}

// Reject incoming follow request
export function useRejectRequest(username) {
    const dispatch = useDispatch()
    const { data: rejectRequestData, patch: rejectRequest, processing: rejectingRequest, errors: rejectRequestErrors } = useForm({})

    function handleRejectRequest (){ 
        if (!rejectingRequest) {
            rejectRequest(route('reject.follower.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.rejectRequest
                    }))
                }
            })
        }
    }

    return { handleRejectRequest, rejectingRequest, rejectRequestErrors }
}

// Mark the incoming follow request as spam
export function useMarkSpamRequest(username) {
    const dispatch = useDispatch()
    const { data: ignoreRequestData, patch: ignoreRequest, processing: ignoringRequest, errors: ignoreRequestErrors } = useForm({})

    function handleMarkSpamRequest (){ 
        if (!ignoringRequest) {
            ignoreRequest(route('ignore.follower.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.ignoreRequest
                    }))
                }
            })
        }
    }

    return { handleMarkSpamRequest, ignoringRequest, ignoreRequestErrors }
}

// Send follow Request
export function useSendRequest(username) {
    const dispatch = useDispatch()
    const { data: sendRequestData, post: sendRequest, processing: sendingRequest, errors: sendRequestErrors } = useForm({})

    function handleSendRequest (){ 
        if (!sendingRequest) {
            sendRequest(route('send.follow.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.followRequest
                    }))
                }
            })
        }
    }

    return { handleSendRequest, sendRequestData, sendingRequest, sendRequestErrors }
}

// Cancel incoming follow request
export function useCancelRequest(username) {
    const dispatch = useDispatch()
    const { data: cancelRequestData, patch: cancelRequest, processing: cancellingRequest, errors: cancelRequestErrors } = useForm({})

    function handleCancelRequest (){ 
        if (!cancellingRequest) {
            cancelRequest(route('cancel.follow.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowingRequest(username))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.cancelRequest
                    }))
                }
            })
        }
    }

    return { handleCancelRequest, cancelRequestData, cancellingRequest, cancelRequestErrors }
}

// Unfollow the following user
export function useUnfollow(username) {
    const dispatch = useDispatch()
    const { data: unFollowData, patch: unFollowRequest, processing: unFollowing, errors: unFollowErrors } = useForm({})

    function handleUnfollow (){
        if (!unFollowing) {
            unFollowRequest(route('unfollow.following', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowingUserFromList(username))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.unfollow
                    }))
                }
            })
        }
    }

    return { handleUnfollow, unFollowData, unFollowing, unFollowErrors }
}

// Remove the user who's following the current user
export function useRemoveFollower(username) {
    const dispatch = useDispatch()
    const { patch: removeFollower, processing: removingFollower, errors: removeFollowerErrors } = useForm({})

    function handleRemoveFollower (){
        if (!removingFollower) {
            removeFollower(route('remove.follower', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerFromList(username))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.removedFollower
                    }))
                }
            })
        }
    }

    return { handleRemoveFollower, removingFollower, removeFollowerErrors }
}

// Block the user
export function useBlockUser(username) {
    const dispatch = useDispatch()
    const { data: blockUserData, post: blockUser, processing: blockingUser, errors: blockUserErrors } = useForm({})

    function handleBlockUser (){ 
        if (!blockingUser) {
            blockUser(route('block.user', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(removeFollowerFromList(username))
                    dispatch(removeFollowingRequest(username))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.blockUser
                    }))
                }
            })
        }
    }

    return { handleBlockUser, blockingUser, blockUserErrors }
}

// Unblock the user
export function useUnBlockUser(username) {
    const dispatch = useDispatch()
    const { data: unBlockUserData, post: unBlockUser, processing: unBlockingUser, errors: unBlockUserErrors } = useForm({})

    function handleUnBlockUser (){ 
        if (!unBlockingUser) {
            unBlockUser(route('unblock.user', {username: username}), {
                onSuccess: (response) => {
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.unBlockUser
                    }))
                }
            })
        }
    }

    return { handleUnBlockUser, unBlockingUser, unBlockUserErrors }
}

// Get and collect list of user's followers
export function useGetFollowers(page = 1) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleGetFollowers () {
        dispatch(setLoading(true))
        try {
            if(contacts.followers && contacts.followers.length <= 0) {
                const response = await axios.get(route('user.followers'), {params: {page: page}})
                dispatch(fillFollowers(response.data.followers.data))
            }
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false))
        }
    }

    return { handleGetFollowers }
}

// Get and collect list of users that current user follows
export function useGetFollowings(page = 1) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleGetFollowings () {
        dispatch(setLoading(true))
        try {
            if(contacts.followings && contacts.followings.length <= 0) {
                const response = await axios.get(route('user.followings'), {params: {page: page}})
                dispatch(fillFollowings(response.data.followings.data))
            }
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false))
        }
    }

    return { handleGetFollowings }
}

// Get and collect incoming follower request
export function useFollowerRequests(page = 1) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleFollowerRequests () {
        dispatch(setLoading(true))
        try {
            if(contacts.incomingRequests && contacts.incomingRequests.length <= 0) {
                const response = await axios.get(route('user.follower.requests'), {params: {page: page}});
                dispatch(fillFollowerRequests(response.data.incomingRequests.data))
            }
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false))
        }
    }

    return { handleFollowerRequests }
}

// Get and collect sent follower request
export function useSentRequests(page = 1) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleSentRequests () {
        dispatch(setLoading(true))
        try {
            if(contacts.sentRequests && contacts.sentRequests.length <= 0) {
                const response = await axios.get(route('user.following.requests'), {params: {page: page}});
                dispatch(fillSentRequests(response.data.sentRequests.data))
            }
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setLoading(false))
            console.log(error)
        }
    }

    return { handleSentRequests }
}