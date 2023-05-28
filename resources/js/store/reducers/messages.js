import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    pane: false,
    messages: [],
    conversations: [],
    unreadConversations: 0,
    loadingMessages: false,
    sendingMessage: false,
    deletePopup: {popup: false, option: false,},
    pinPopup: false,
    pinnedMessages: [],
    pinnedCounter: 0,
    pinning: false,
    pinMessagesPopup: false,
    data: {
      chat: '',
      message: '',
      sender: '',
      receiver: '',
    },
    reacting: false,
    loadingConversations: false,
    isBlocked: false,
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setData: (state, action) => {
      state.data.chat = action.payload.chat
      state.data.message = action.payload.message
      state.data.sender = action.payload.sender
      state.data.receiver = action.payload.receiver
    },
    toggleLoadingMessages: (state, action) => {
      state.loadingMessages = action.payload
    },
    toggleSendingMessage: (state, action) => {
      state.sendingMessage = action.payload
    },
    toggleDeletePopup: (state, action) => {
      state.deletePopup.popup = action.payload.popup
      state.deletePopup.option = action.payload.option
    },
    togglePinPopup: (state, action) => {
      state.pinPopup = action.payload
    },
    reduceMessages: (state, action) => {
      const index = state.messages.findIndex((message) => message.id == action.payload);
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    },
    fetchNewMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    seenMessages: (state, action) => {
      state.messages.forEach(chat => {
        if(chat.id == action.payload.chat && action.payload.message !== null) {
          const message = chat.messages.find(message => message.id == action.payload.message)
          if(message) {
            message.seen_at = action.payload.seen_at
          }
        }
      })
    },
    setPinneds: (state, action) => {
      action.payload.messages.forEach((item) => {
        const isPinned = item.messages.filter((message) => {
          return message.pinned || (message.pinned_by == action.payload.currentUser)
        }).some(Boolean)
        
        if (isPinned) {
          state.pinnedMessages.push(item);
        }
      })
    },
    setPinnedCounter: (state, action) => {
      state.pinnedCounter = action.payload.counter
      if(action.payload.messageId){
        state.messages.map(data => {
          data.messages.map(message => {
            if (message.id == action.payload.messageId) {
              const index = state.pinnedMessages.findIndex((message) => message.id == action.payload.messageId);
              if(message.pinned) {
                message.pinned = false
                if (index !== -1) {
                  state.pinnedMessages.splice(index, 1);
                }
                return
              } else {
                message.pinned = true
                state.pinnedMessages.push(data);
                return
              }
            }
          })
        })
      }
    },
    togglePinning: (state, action) => {
      state.pinning = action.payload
    },
    togglePinMessagesPopup: (state, action) => {
      state.pinMessagesPopup = action.payload
    },
    reactToMessage: (state, action) => {
      state.messages
      .filter(chat => chat.id == action.payload.chat && chat.messages.some(message => message.id == action.payload.message))
      .forEach(chat => {
        const message = chat.messages.find(message => message.id == action.payload.message)
        if (message) {
          if(action.payload.reaction !== null) {
            const reaction = message.reactions.find(reaction => reaction.user_id == action.payload.user && reaction.message_id == action.payload.message)
            if(reaction) {
              reaction.reaction = action.payload.reaction
            } else {
              message.reactions.push(action.payload.reaction)
            }
          } else {
            const index = message.reactions.findIndex((reaction) => reaction.user_id == action.payload.user && reaction.message_id == action.payload.message);
            if (index !== -1) {
              message.reactions.splice(index, 1);
            }
          }
        }
      })
    },
    toggleReacting: (state, action) => {
      state.reacting = action.payload
    },
    fetchConversations: (state, action) => {
      state.conversations = action.payload
    },
    toggleLoadingConversations: (state, action) => {
      state.loadingConversations = action.payload
    },
    fillUnreadConversations: (state, action) => {
      state.unreadConversations = action.payload
    },
    emptyConversation: (state, action) => {
      state.messages = []
      state.conversations = []
    },
    toggleIsBlocked: (state, action) => {
      state.isBlocked = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setPane, 
  setMessages,
  setData,
  toggleLoadingMessages, 
  toggleSendingMessage, 
  toggleDeletePopup,
  togglePinPopup,
  reduceMessages,
  fetchNewMessage,
  seenMessages,
  setPinneds,
  setPinnedCounter,
  togglePinning,
  togglePinMessagesPopup,
  reactToMessage,
  toggleReacting,
  toggleLoadingConversations,
  fetchConversations,
  fillUnreadConversations,
  emptyConversation,
  toggleIsBlocked,
} = messagesSlice.actions

export default messagesSlice.reducer