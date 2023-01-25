import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import themeSlice from './theme'

export default configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
  },
})