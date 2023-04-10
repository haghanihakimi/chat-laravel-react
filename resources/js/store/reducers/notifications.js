import { createSlice } from '@reduxjs/toolkit'

export const notificationsSlice = createSlice({
  name: 'notifications',
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
export const { setPane } = notificationsSlice.actions

export default notificationsSlice.reducer