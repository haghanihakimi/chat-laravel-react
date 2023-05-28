import { 
    setPendingContacts, 
} from "../reducers/contacts";
import { 
    reduceMessages, 
    fetchNewMessage, 
    seenMessages, 
    reactToMessage, 
    setPinnedCounter,
    toggleIsBlocked,
} from "../reducers/messages";
import { useDispatch, useSelector } from "react-redux";
import { useMarkAsSeen } from "./messages";


//Listen to incoming following request - Enter
export function useListeners() {
    const messages = useSelector(state => state.messages)
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const {markOneToOneMessageAsSeen} = useMarkAsSeen()

    function blockUserListen(user) {
        window.Echo.private(`block.${user.id}`).listen('BlockEvent', (e) => {
            dispatch(toggleIsBlocked(e.isBlocked))
        });
    }

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
            dispatch(seenMessages(e))
        });
    }

    function messageReactionListen(user) {
        window.Echo.private(`message.reaction.${user.id}`).listen('MessageReactionEvent', (e) => {
            dispatch(reactToMessage({
                'chat': e.chat,
                'message': e.message,
                'user': e.user,
                'host': e.host,
                'reaction': e.reaction
            }))
        });
    }

    function pinMessageListen(user) {
        window.Echo.private(`pin.message.${user.id}`).listen('PinMessageEvent', (e) => {
            console.log(messages.pinnedCounter)
            dispatch(setPinnedCounter({counter: e.action == 'pin' ? messages.pinnedCounter + 1 : messages.pinnedCounter - 1, messageId: e.message}))
        });
    }

    return {
        blockUserListen,
        incomingFollowRequest,
        cancelFollowRequest,
        deleteTwoWayMessage,
        sendOneToOneMessageListen,
        seenOneToOneMessageListen,
        messageReactionListen,
        pinMessageListen,
    }
}

// Listen to incoming following requests - Leave
export function useListenersLeave() {
    function blockuserLeave(user) {
      window.Echo.leave(`block.${user.id}`);
    }

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
    
    function messageReactionLeave(user) {
        window.Echo.leave(`message.reaction.${user}`);
    }

    function pinMessageLeave(user) {
        window.Echo.leave(`pin.message.${user}`);
    }

    return { 
        blockuserLeave,
        incomingFollowListener, 
        cancelFollowRequestListener, 
        deleteTwoWayMessageLeave,
        sendOneToOneMessageLeave, 
        seenOneToOneMessageLeave,
        messageReactionLeave,
        pinMessageLeave,
    }
}