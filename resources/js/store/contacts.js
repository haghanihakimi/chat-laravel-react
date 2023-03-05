import { createSlice } from '@reduxjs/toolkit'

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    pane: false,
    paneList: {contacts: true, requests: false, incomeRequests: false}
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
    },
    setPaneList: (state, action) => {
        switch(action.payload) {
            case 'contacts':
                state.paneList.contacts = true
                state.paneList.requests = false
                state.paneList.incomeRequests = false
                break;
            case 'requests':
                state.paneList.contacts = false
                state.paneList.requests = true
                state.paneList.incomeRequests = false
                break;
            case 'incomeRequests':
                state.paneList.contacts = false
                state.paneList.requests = false
                state.paneList.incomeRequests = true
                break;
            default:
                alert('Invalid Contact Pane List Entry!');
                break;
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPane, setPaneList } = contactsSlice.actions

export default contactsSlice.reducer