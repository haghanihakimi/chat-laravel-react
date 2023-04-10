import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import authSlice from './reducers/auth'
import themeSlice from './reducers/theme'
import messagesSlice from './reducers/messages'
import notificationsSlice from './reducers/notifications';
import contactsSlice from './reducers/contacts'
import searchSlice from './reducers/search'
import alertsSlice from './reducers/alerts'
import settingsSlice from './reducers/settings'

export default configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    messages: messagesSlice,
    notifications: notificationsSlice,
    contacts: contactsSlice,
    search: searchSlice,
    alerts: alertsSlice,
    settings: settingsSlice,
  },
  middleware: [thunk]
})