import { 
    setPendingContacts, 
} from "../reducers/contacts";
import { reduceMessages } from "../reducers/messages";
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

    function deleteTwoWayMessage(chat, user) {
        window.Echo.private(`DeleteTwoWayMessage.${user}`).listen('DeleteMessageTwoWay', (e) => {
            dispatch(reduceMessages(chat))
            console.log(chat)
        });
    }

    return {
        incomingFollowRequest,
        cancelFollowRequest,
        deleteTwoWayMessage,
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
    
    function deleteTwoWayMessageLeave(user) {
        window.Echo.leave(`DeleteTwoWayMessage.${user}`);
    }

    return { 
        incomingFollowListener, 
        cancelFollowRequestListener, 
        deleteTwoWayMessageLeave 
    }
}