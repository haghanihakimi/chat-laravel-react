import { useDispatch } from "react-redux";


//Listen to incoming following request - Enter
export function useListeners() {
    const dispatch = useDispatch()

    function incomingFollowRequest(data, user){
        window.Echo.private(`followerRequest.${user.id}`).listen('SendFollowRequest', (e) => {
            dispatch(setPendingContacts(data))
        });
    }

    function cancelFollowRequest(data, user) {
        window.Echo.private(`cancelFollowRequest.${user.id}`).listen('CancelFollowRequest', (e) => {
            dispatch(setPendingContacts(data))
        });
    }

    return {
        incomingFollowRequest,
        cancelFollowRequest,
    }
}

// Listen to incoming following requests - Leave
export function useListenersLeave() {
    function incomingFollowListener(user) {
      window.Echo.leave(`followerRequest.${user.id}`);
    }
    
    function cancelFollowRequestListener(user) {
        window.Echo.leave(`cancelFollowRequest.${user.id}`);
    }

    return { incomingFollowListener, cancelFollowRequestListener }
}