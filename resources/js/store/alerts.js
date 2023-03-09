import { createSlice } from '@reduxjs/toolkit'

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    options: {
        type: '', // holds POST, GET, DELTE and other ajax actions
        title: '', // Holds the heading of the popup
        body: '', // Holds paragraph below heading
        buttons: [], // Holds all information about buttons need to be used on this popup
        action: '', // Holds CONFIRMATION or CANCELATION of popup
        path: '', // Holds the API path for POST, GET or DELETE actions
        status: false, // Holds the status of display or not to display the popup
        loading: false, // Holds the status of display or not to display the loading icon
    }
  },
  reducers: {
    setOptions: (state, action) => {
        state.options.type = action.payload.type
        state.options.title = action.payload.title
        state.options.body = action.payload.body
        state.options.buttons = action.payload.buttons
        state.options.action = action.payload.action
        state.options.path = action.payload.path
        state.options.status = action.payload.status
        state.options.loading = action.payload.loading
    },
    btnConfirm: (state, action) => {
        state.options.action = 'confirm'
        state.options.loading = true
    },
    btnOK: (state, action) => {
        state.options.action = 'ok'
    },
    btnDelete: (state, action) => {
        state.options.action = 'delete'
        state.options.loading = true
    },
    btnCancel: (state, action) => {
        state.options.action = 'cancel'
        state.options.status = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOptions, btnConfirm, btnOK, btnCancel } = alertsSlice.actions

export default alertsSlice.reducer