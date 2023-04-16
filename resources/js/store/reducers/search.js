import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import route from 'ziggy-js'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    pane: false,
    loading: false
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
        state.searchResults = []
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload
    },
    fillSearchResults: (state, action) => {
      state.searchResults = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPane, toggleLoading, fillSearchResults } = searchSlice.actions

export default searchSlice.reducer