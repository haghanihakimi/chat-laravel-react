import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    pane: false,
    messages: [],
    loadingMessages: false,
    doingAction: false,
    deletePopup: false,
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    toggleLoadingMessages: (state, action) => {
      state.loadingMessages = action.payload
    },
    toggleDoingAction: (state, action) => {
      state.doingAction = action.payload
    },
    toggleDeletePopup: (state, action) => {
      state.deletePopup = action.payload
    },
    reduceMessages: (state, action) => {
      let i = state.messages.map(data => data.id).indexOf(action.payload)
      state.messages.splice(i, 1)
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setPane, 
  setMessages,
  toggleLoadingMessages, 
  toggleDoingAction, 
  toggleDeletePopup,
  reduceMessages,
} = messagesSlice.actions

export default messagesSlice.reducer