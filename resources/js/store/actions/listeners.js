import { 
    setPendingContacts, 
} from "../reducers/contacts";
import { reduceMessages, fetchNewMessage, seenMessages } from "../reducers/messages";
import { useDispatch, useSelector } from "react-redux";
import { useMarkAsSeen } from "./messages";


//Listen to incoming following request - Enter
export function useListeners() {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()
    const {markOneToOneMessageAsSeen} = useMarkAsSeen()

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

    function deleteTwoWayMessage(user) {
        window.Echo.private(`deleteTwoWayMessage.${user}`).listen('DeleteMessageTwoWay', (e) => {
            dispatch(reduceMessages(e.chat))
        });
    }

    function sendOneToOneMessageListen(user, username) {
        window.Echo.private(`sendOneToOneMessage.${user.id}`).listen('SendOneToOneMessage', (e) => {
            dispatch(fetchNewMessage(e.chat))
            markOneToOneMessageAsSeen(username)
        });
    }

    function seenOneToOneMessageListen(user, username) {
        window.Echo.private(`seenOneToOneMessage.${user.id}`).listen('SeenOneToOneMessage', (e) => {
            // dispatch(seenMessages())
        });
    }

    return {
        incomingFollowRequest,
        cancelFollowRequest,
        deleteTwoWayMessage,
        sendOneToOneMessageListen,
        seenOneToOneMessageListen,
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
        window.Echo.leave(`deleteTwoWayMessage.${user}`);
    }
    
    function sendOneToOneMessageLeave(user) {
        window.Echo.leave(`sendOneToOneMessage.${user}`);
    }
    
    function seenOneToOneMessageLeave(user) {
        window.Echo.leave(`seenOneToOneMessage.${user}`);
    }

    return { 
        incomingFollowListener, 
        cancelFollowRequestListener, 
        deleteTwoWayMessageLeave,
        sendOneToOneMessageLeave, 
        seenOneToOneMessageLeave,
    }
}