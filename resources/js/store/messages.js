import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    pane: false,
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPane } = messagesSlice.actions

export default messagesSlice.reducer