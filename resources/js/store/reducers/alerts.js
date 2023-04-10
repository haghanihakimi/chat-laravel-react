import { createSlice } from '@reduxjs/toolkit'
import { useForm } from '@inertiajs/react'
import { useDispatch } from 'react-redux'

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
        message: '',
        status: false, // Holds the status of display or not to display the popup
        loading: false, // Holds the status of display or not to display the loading icon
        errors: [],
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
      console.log(alertsSlice.reducer)
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
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload
    },
    post: (state, action) => {
      console.log("works")
      // const {post, processing, errors} = useForm()
      // if (!processing) {
      //   state.options.loading = true
      //   state.options.errors = []
      //   post(state.options.path, {
      //     onSuccess: (response) => {
      //       state.options.loading = false,
      //       state.options.errors.push(errors)
      //       state.options.message = response.flash && response.flash.message ? response.flash.message : ''
      //     }
      //   })
      // }
    },
    patch: (state, action) => {
      const {patch, processing, errors, isDirty} = useForm()
      if (!processing) {
        state.options.loading = true
        state.options.errors = []
        patch(state.options.path, {
          onSuccess: (response) => {
            state.options.loading = false,
            state.options.errors.push(errors)
            state.options.message = response.flash && response.flash.message ? response.flash.message : ''
          }
        })
      }
    },
    delete: (state, action) => {
      const {delete: delete1, processing, errors, isDirty} = useForm()
      if (!processing) {
        state.options.loading = true
        state.options.errors = []
        delete1(state.options.path, {
          onSuccess: (response) => {
            state.options.loading = false,
            state.options.errors.push(errors)
            state.options.message = response.flash && response.flash.message ? response.flash.message : ''
          }
        })
      }
    },
    put: (state, action) => {
      const {put, processing, errors} = useForm()
      if (!processing) {
        state.options.loading = true
        state.options.errors = []
        put(state.options.path, {
          onSuccess: (response) => {
            state.options.loading = false,
            state.options.errors.push(errors)
            state.options.message = response.flash && response.flash.message ? response.flash.message : ''
          }
        })
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOptions, btnConfirm, btnOK, btnCancel, toggleLoading } = alertsSlice.actions

export default alertsSlice.reducer