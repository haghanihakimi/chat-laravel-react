import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import themeSlice from './theme'
import registrationSlice from './registration'

export default configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    registration: registrationSlice,
  },
})