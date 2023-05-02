import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    pane: false,
    messages: [],
    loadingMessages: false,
    sendingMessage: false,
    deletePopup: false,
    currentChat: '',
    pinnedMessages: [],
    pinnedCounter: 0,
    pinning: false,
    pinMessagesPopup: false,
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setCurrentchat: (state, action) => {
      state.currentChat = action.payload
    },
    toggleLoadingMessages: (state, action) => {
      state.loadingMessages = action.payload
    },
    toggleSendingMessage: (state, action) => {
      state.sendingMessage = action.payload
    },
    toggleDeletePopup: (state, action) => {
      state.deletePopup = action.payload
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
      state.pinnedCounter = action.payload
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
  setCurrentchat,
  toggleLoadingMessages, 
  toggleSendingMessage, 
  toggleDeletePopup,
  reduceMessages,
  fetchNewMessage,
  seenMessages,
  setPinneds,
  setPinnedCounter,
  togglePinning,
  togglePinMessagesPopup,
} = messagesSlice.actions

export default messagesSlice.reducer