import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    pane: false,
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPane } = searchSlice.actions

export default searchSlice.reducer