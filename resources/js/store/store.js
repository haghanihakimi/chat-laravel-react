import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import themeSlice from './theme'
import messagesSlice from './messages'
import contactsSlice from './contacts'
import searchSlice from './search'
import alertsSlice from './alerts'
import settingsSlice from './settings'

export default configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    messages: messagesSlice,
    contacts: contactsSlice,
    search: searchSlice,
    alerts: alertsSlice,
    settings: settingsSlice,
  },
})