import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: JSON.parse(localStorage.getItem('theme')) || 'white',
  },
  reducers: {
    getTheme: (state) => {
        if (localStorage.getItem('theme')) {
            state.value = JSON.parse(localStorage.getItem('theme'))
            document.querySelector('html').className = state.value
        } else {
            localStorage.setItem('theme', JSON.stringify(state.value))
            state.value = JSON.parse(localStorage.getItem('theme'))
        }
    },
    setTheme: (state, action) => {
        localStorage.setItem('theme', JSON.stringify(action.payload))
        state.value = JSON.parse(localStorage.getItem('theme'))
        document.querySelector('html').className = state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { getTheme, setTheme } = themeSlice.actions

export default themeSlice.reducer