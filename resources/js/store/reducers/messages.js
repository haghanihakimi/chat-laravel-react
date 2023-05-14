import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    pane: false,
    messages: [],
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
    }
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
      for(var i = 0;i >= state.messages.length;i++) {
        console.log(i)
      }
    },
    setPinneds: (state, action) => {
      state.pinnedMessages = action.payload
    },
    setPinnedCounter: (state, action) => {
      state.pinnedCounter = action.payload.counter
      if(action.payload.messageId){
        state.messages.map(data => {
          data.messages.map(message => {
            if (message.id == action.payload.messageId) {
              message.pinned = message.pinned ? false : true
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
} = messagesSlice.actions

export default messagesSlice.reducer