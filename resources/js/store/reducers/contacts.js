import { createSlice } from '@reduxjs/toolkit'


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    pane: false,
    paneList: {followers: true, followings: false, requests: false, sentRequests: false, incomeRequests: false},
    actionOutputs: {
      open: false,
      header: '',
      body: ''
    },
    followers: [],
    followings: [],
    incomingRequests: [],
    sentRequests: [],
    abilities: [],
    loading: false,
    loadingAbilities: false,
  },
  reducers: {
    setPane: (state, action) => {
        state.pane = action.payload
    },
    setPaneList: (state, action) => {
      switch(action.payload) {
          case 'followers':
            state.paneList.followers = true
            state.paneList.followings = false
            state.paneList.requests = false
            state.paneList.incomeRequests = false
            state.paneList.sentRequests = false
            break;
          case 'followings':
            state.paneList.followers = false
            state.paneList.followings = true
            state.paneList.requests = false
            state.paneList.incomeRequests = false
            state.paneList.sentRequests = false
            break;
          case 'requests':
            state.paneList.followers = false
            state.paneList.followings = false
            state.paneList.requests = true
            state.paneList.incomeRequests = true
            state.paneList.sentRequests = false
            break;
          case 'incomingRequests':
            state.paneList.followers = false
            state.paneList.followings = false
            state.paneList.requests = true
            state.paneList.incomeRequests = true
            state.paneList.sentRequests = false
            break;
          case 'sentRequests':
            state.paneList.followers = false
            state.paneList.followings = false
            state.paneList.requests = true
            state.paneList.incomeRequests = false
            state.paneList.sentRequests = true
            break;
          default:
            alert('Invalid Contact Pane List Entry!');
            break;
      }
    },
    setActionOutput: (state, action) => {
      state.actionOutputs = {
        open: action.payload.open,
        header: action.payload.header,
        body: action.payload.body,
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    toggleLoadingAbilities: (state, action) => {
      state.loadingAbilities = action.payload
    },
    fillFollowers: (state, action) => {
      state.followers = action.payload
    },
    fillFollowings: (state, action) => {
      state.followings = action.payload
    },
    fillFollowerRequests: (state, action) => {
      state.incomingRequests = action.payload
    },
    fillSentRequests: (state, action) => {
      state.sentRequests = action.payload
    },
    setAbilities: (state, action) => {
      state.abilities = action.payload
    },
    removeFollowerFromList: (state, action) => {
      let i = state.followers.map(user => user.username).indexOf(action.payload)
      state.followers.splice(i, 1)
    },
    removeFollowingUserFromList: (state, action) => {
      let i = state.followings.map(user => user.username).indexOf(action.payload)
      state.followings.splice(i, 1)
    },
    removeFollowerRequest: (state, action) => {
      let i = state.incomingRequests.map(user => user.username).indexOf(action.payload)
      state.incomingRequests.splice(i, 1)
    },
    removeFollowingRequest: (state, action) => {
      let i = state.sentRequests.map(user => user.username).indexOf(action.payload)
      state.sentRequests.splice(i, 1)
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setPane, 
  setPaneList, 
  setActionOutput,
  fillFollowers, 
  fillFollowings, 
  fillFollowerRequests,
  fillSentRequests,
  setAbilities,
  setLoading, 
  toggleLoadingAbilities,
  removeFollowerFromList,
  removeFollowingUserFromList,
  removeFollowerRequest,
  removeFollowingRequest,
} = contactsSlice.actions

export default contactsSlice.reducer