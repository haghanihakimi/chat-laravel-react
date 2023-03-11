import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    loggedOut: false,
  },
  reducers: {
    setAuth: (state, action) => {
      switch (action.payload) {
        case 'login':
          state.loggedIn = true
          state.loggedOut = false
          break;
        case 'logout':
          state.loggedIn = false
          state.loggedOut = true
          break;
        default:
          break;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer