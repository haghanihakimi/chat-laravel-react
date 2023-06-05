import { Link, useForm } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux'
import { setActionOutput, 
    setLoading, 
    toggleLoadingAbilities,
    fillFollowerRequests, 
    fillSentRequests, 
    fillFollowers, 
    fillPaginatedFollowers,
    fillFollowings, 
    setAbilities,
    modifyAbilities,
    removeFollowerFromList,
    removeFollowingUserFromList,
    removeFollowerRequest, 
    removeFollowingRequest,
    setPendingContacts,
    fillBlockedUsers,
    reduceBlockedUsers,
    fillIgnoredUsers,
    reduceIgnoredUsers,
    toggleLoadingBlockedUsers,
    toggleLoadingIgnoredUsers,
    fillPaginatedFollowings,
    fillPaginatedFollowerRequests,
    fillPaginatedFollowingRequests,
} from '../reducers/contacts'
import route from 'ziggy-js'
import axios from 'axios'
import { useListeners } from './listeners'

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
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { data: acceptRequestData, patch: acceptRequest, processing: acceptingRequest, errors: acceptRequestErrors } = useForm({})

    function handleAcceptRequest (){ 
        if (!acceptingRequest) {
            acceptRequest(route('accept.follow.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: contacts.abilities.ability.canFollow,
                        canUnfollow: contacts.abilities.ability.canUnfollow,
                        canBlock: true,
                        canUnblock: false,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: true,
                    }))
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
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { data: rejectRequestData, patch: rejectRequest, processing: rejectingRequest, errors: rejectRequestErrors } = useForm({})

    function handleRejectRequest (){ 
        if (!rejectingRequest) {
            rejectRequest(route('reject.follower.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: contacts.abilities.ability.canFollow,
                        canUnfollow: contacts.abilities.ability.canUnfollow,
                        canBlock: contacts.abilities.ability.canBlock,
                        canUnblock: contacts.abilities.ability.canUnblock,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
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
export function useMarkSpamRequest() {
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { data: ignoreRequestData, patch: ignoreRequest, processing: ignoringRequest, errors: ignoreRequestErrors } = useForm({})
    const { data: unIgnoreRequestData, patch: unIgnoreRequest, processing: unIgnoringRequest, errors: unIgnoreRequestErrors } = useForm({})

    function handleMarkSpamRequest (username){ 
        if (!ignoringRequest) {
            ignoreRequest(route('ignore.follower.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: false,
                        canUnfollow: false,
                        canBlock: true,
                        canUnblock: false,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.ignoreRequest
                    }))
                }
            })
        }
    }

    function handleUnMarkSpamRequest (username){ 
        if (!unIgnoringRequest) {
            unIgnoreRequest(route('unignore.follower.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: false,
                        canUnfollow: false,
                        canBlock: true,
                        canUnblock: false,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
                    dispatch(reduceIgnoredUsers(username))
                    dispatch(setActionOutput({
                        open: true,
                        header: '',
                        body: response.props.flash.message.unignoreRequest
                    }))
                }
            })
        }
    }
    
    async function handleGetIgnoredUsers (page = 1){ 
        dispatch(toggleLoadingIgnoredUsers(true))
        try {
            if(contacts.ignoredUsers && contacts.ignoredUsers.length <= 0) {
                const response = await axios.get(route('get.spammed.users'), {params: {page: page}})
                dispatch(fillIgnoredUsers(response.data.ignoredUsers.data))
            }
            dispatch(toggleLoadingIgnoredUsers(false))
        } catch (error) {
            console.log(error)
            dispatch(toggleLoadingIgnoredUsers(false))
        }
    }

    return { 
        handleMarkSpamRequest, 
        handleUnMarkSpamRequest,
        handleGetIgnoredUsers, 
        ignoringRequest, 
        unIgnoringRequest,
    }
}

// Send follow Request
export function useSendRequest(username) {
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { data: sendRequestData, post: sendRequest, processing: sendingRequest, errors: sendRequestErrors } = useForm({})

    function handleSendRequest (){ 
        if (!sendingRequest) {
            sendRequest(route('send.follow.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: false,
                        canUnfollow: true,
                        canBlock: true,
                        canUnblock: false,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
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
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { data: cancelRequestData, patch: cancelRequest, processing: cancellingRequest, errors: cancelRequestErrors } = useForm({})

    function handleCancelRequest (){ 
        if (!cancellingRequest) {
            cancelRequest(route('cancel.follow.request', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowingRequest(username))
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: true,
                        canUnfollow: false,
                        canBlock: true,
                        canUnblock: false,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
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
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { data: unFollowData, patch: unFollowRequest, processing: unFollowing, errors: unFollowErrors } = useForm({})

    function handleUnfollow (){
        if (!unFollowing) {
            unFollowRequest(route('unfollow.following', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowingUserFromList(username))
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: true,
                        canUnfollow: false,
                        canBlock: true,
                        canUnblock: false,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
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
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { patch: removeFollower, processing: removingFollower, errors: removeFollowerErrors } = useForm({})

    function handleRemoveFollower (){
        if (!removingFollower) {
            removeFollower(route('remove.follower', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerFromList(username))
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: contacts.abilities.ability.canFollow,
                        canUnfollow: contacts.abilities.ability.canUnfollow,
                        canBlock: true,
                        canUnblock: false,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
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
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { data: blockUserData, post: blockUser, processing: blockingUser, errors: blockUserErrors } = useForm({})

    function handleBlockUser (){ 
        if (!blockingUser) {
            blockUser(route('block.user', {username: username}), {
                onSuccess: (response) => {
                    dispatch(removeFollowerRequest(username))
                    dispatch(removeFollowerFromList(username))
                    dispatch(removeFollowingRequest(username))
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: false,
                        canUnfollow: false,
                        canBlock: false,
                        canUnblock: true,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
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
export function useUnBlockUser() {
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const { data: unBlockUserData, post: unBlockUser, processing: unBlockingUser, errors: unBlockUserErrors } = useForm({})

    function handleUnBlockUser (username){ 
        if (!unBlockingUser) {
            unBlockUser(route('unblock.user', {username: username}), {
                onSuccess: (response) => {
                    dispatch(modifyAbilities({
                        username: username,
                        isBlocked: false,
                        canFollow: true,
                        canUnfollow: false,
                        canBlock: true,
                        canUnblock: false,
                        canReject: false,
                        canAccept: false,
                        canCancelRequest: false,
                        canIgnore: false,
                        canRemove: false,
                    }))
                    dispatch(reduceBlockedUsers(username))
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

//get all blocked users
export function useGetBlockedUsers(page = 1) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleGetBlockedUsers () {
        dispatch(toggleLoadingBlockedUsers(true))
        try {
            if(contacts.blockedUsers && contacts.blockedUsers.length <= 0) {
                const response = await axios.get(route('get.blocked.users'), {params: {page: page}})
                dispatch(fillBlockedUsers(response.data.blockedUsers.data))
            }
            dispatch(toggleLoadingBlockedUsers(false))
        } catch (error) {
            console.log(error)
            dispatch(toggleLoadingBlockedUsers(false))
        }
    }

    return { handleGetBlockedUsers }
}

// Get and collect list of user's followers
export function useGetFollowers() {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleGetFollowers (page = 1) {
        try {
            if(contacts.followers.length <= 0) {
                const response = await axios.get(route('user.followers'), {params: {page: page}})
                dispatch(fillFollowers(response.data.followers)) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleGetPaginatedFollowers(page = 1) {
        try {
            const response = await axios.get(route('user.followers'), {params: {page: page}})
            dispatch(fillPaginatedFollowers (response.data.followers))
        } catch (error) {
            console.log(error)
        }
    }

    return { handleGetFollowers, handleGetPaginatedFollowers }
}

// Get and collect list of users that current user follows
export function useGetFollowings() {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleGetFollowings (page = 1) {
        try {
            if(contacts.followings && contacts.followings.length <= 0) {
                const response = await axios.get(route('user.followings'), {params: {page: page}})
                dispatch(fillFollowings(response.data.followings))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleGetPaginatedFollowings (page = 1) {
        try {
            const response = await axios.get(route('user.followings'), {params: {page: page}})
            dispatch(fillPaginatedFollowings(response.data.followings))
        } catch (error) {
            console.log(error)
        }
    }

    return { handleGetFollowings, handleGetPaginatedFollowings }
}

// Get and collect incoming follower request
export function useFollowerRequests() {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleFollowerRequests (page = 1) {
        try {
            if(contacts.incomingRequests && contacts.incomingRequests.length <= 0) {
                const response = await axios.get(route('user.follower.requests'), {params: {page: page}});
                dispatch(fillFollowerRequests(response.data.incomingRequests))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handlePaginatedFollowerRequests (page = 1) {
        try {
            const response = await axios.get(route('user.follower.requests'), {params: {page: page}});
            dispatch(fillPaginatedFollowerRequests(response.data.incomingRequests))
        } catch (error) {
            console.log(error)
        }
    }

    return { handleFollowerRequests, handlePaginatedFollowerRequests }
}

// Get and collect sent follower request
export function useSentRequests() {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()

    async function handleSentRequests (page = 1) {
        try {
            if(contacts.sentRequests && contacts.sentRequests.length <= 0) {
                const response = await axios.get(route('user.following.requests'), {params: {page: page}});
                dispatch(fillSentRequests(response.data.sentRequests))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handlePaginatedSentRequests (page = 1) {
        try {
            const response = await axios.get(route('user.following.requests'), {params: {page: page}});
            dispatch(fillPaginatedFollowingRequests(response.data.sentRequests))
        } catch (error) {
            console.log(error)
        }
    }

    return { handleSentRequests, handlePaginatedSentRequests }
}

// Get number of pending incoming requests
export function usePendingRequestsCounter(user) {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch()
    const {incomingFollowRequest, cancelFollowRequest} = useListeners()

    async function handlePendingRequestsCounter() {
        dispatch(setLoading(true))
        try {
            const response = await axios.get(route('count.incoming.follower.requests'));
            dispatch(setPendingContacts(response.data.counter))
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setLoading(false))
            console.log(error)
        }
    }
    incomingFollowRequest(contacts.pendingContacts + 1, user)
    cancelFollowRequest(contacts.pendingContacts - 1, user)

    return { handlePendingRequestsCounter }
}