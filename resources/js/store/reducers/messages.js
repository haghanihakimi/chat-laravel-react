import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    pane: false,
    messages: [],
    loadingMessages: false,
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
    },
    setMessages: (state, action) => {
      state.messages.unshift(action.payload)
    },
    toggleLoadingMessages: (state, action) => {
      state.loadingMessages = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setPane, 
  setMessages,
  toggleLoadingMessages 
} = messagesSlice.actions

export default messagesSlice.reducer