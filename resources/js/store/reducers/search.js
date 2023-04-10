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
    },
    runSearch: (state, action) => {
      state.loading = true
      let results = []
      axios.get(route('user.search'), {params: {keywords: action.payload}})
      .then(response => {
        results = response.data
      })
      .finally(() => {
      })
      state.searchResults = results
      state.loading = false
      console.log(state.searchResults)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPane, runSearch } = searchSlice.actions

export default searchSlice.reducer