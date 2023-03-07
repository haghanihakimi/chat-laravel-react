import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import themeSlice from './theme'
import registrationSlice from './registration'
import messagesSlice from './messages'
import contactsSlice from './contacts'
import searchSlice from './search'

export default configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    registration: registrationSlice,
    messages: messagesSlice,
    contacts: contactsSlice,
    search: searchSlice,
  },
})