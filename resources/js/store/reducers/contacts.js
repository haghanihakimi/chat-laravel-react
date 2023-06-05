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
    pendingContacts: 0,
    loading: false,
    loadingAbilities: false,
    blockedUsersPopup: false,
    ignoredUsersPopup: false,
    blockedUsers: [],
    ignoredUsers: [],
    loadingBlockedUsers: false,
    loadingIgnoredUsers: false,
    getFollowersPagination: {
      last_page: 0,
      page: 1,
    },
    getFollowingsPagination: {
      last_page: 0,
      page: 1,
    },
    getFollowerRequestsPagination: {
      last_page: 0,
      page: 1
    },
    getFollowingRequestsPagination: {
      last_page: 0,
      page: 1
    }
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
    setPendingContacts: (state, action) => {
      state.pendingContacts = action.payload
    },
    fillFollowers: (state, action) => {
      state.followers = action.payload.data
      state.getFollowersPagination.last_page = action.payload.last_page
    },
    fillPaginatedFollowers: (state, action) => {
      state.followers.push(...action.payload.data)
      state.getFollowersPagination.last_page = action.payload.last_page
    },
    countFollowersPaginationPage: (state, action) => {
      state.getFollowersPagination.page = action.payload
    },
    fillFollowings: (state, action) => {
      state.followings = action.payload.data
      state.getFollowingsPagination.last_page = action.payload.last_page
    },
    fillPaginatedFollowings: (state, action) => {
      state.followings.push(...action.payload.data)
      state.getFollowingsPagination.last_page = action.payload.last_page
    },
    countFollowingsPaginationPage: (state, action) => {
      state.getFollowingsPagination.page = action.payload
    },
    fillFollowerRequests: (state, action) => {
      state.incomingRequests = action.payload.data
      state.getFollowerRequestsPagination.last_page = action.payload.last_page
    },
    fillPaginatedFollowerRequests: (state, action) => {
      state.incomingRequests.push(...action.payload.data)
      state.getFollowerRequestsPagination.last_page = action.payload.last_page
    },
    countFollowerRequestsPaginationPage: (state, action) => {
      state.getFollowerRequestsPagination.page = action.payload
    },

    fillSentRequests: (state, action) => {
      state.sentRequests = action.payload.data
      state.getFollowingRequestsPagination.last_page = action.payload.last_page
    },
    fillPaginatedFollowingRequests: (state, action) => {
      state.sentRequests.push(...action.payload.data)
      state.getFollowingRequestsPagination.last_page = action.payload.last_page
    },
    countFollowingRequestsPaginationPage: (state, action) => {
      state.getFollowingRequestsPagination.page = action.payload
    },

    setAbilities: (state, action) => {
      state.abilities = action.payload
    },
    modifyAbilities: (state, action) => {
      if(action.payload.username == state.abilities.user) {
        state.abilities.ability.isBlocked = action.payload.isBlocked
        state.abilities.ability.canFollow = action.payload.canFollow
        state.abilities.ability.canUnfollow = action.payload.canUnfollow
        state.abilities.ability.canBlock = action.payload.canBlock
        state.abilities.ability.canUnblock = action.payload.canUnblock
        state.abilities.ability.canReject = action.payload.canReject
        state.abilities.ability.canAccept = action.payload.canAccept
        state.abilities.ability.canCancelRequest = action.payload.canCancelRequest
        state.abilities.ability.canIgnore = action.payload.canIgnore
        state.abilities.ability.canRemove = action.payload.canRemove
      }
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
    fillBlockedUsers: (state, action) => {
      state.blockedUsers = action.payload
    },
    reduceBlockedUsers: (state, action) => {
      const index = state.blockedUsers.findIndex((user) => user.username == action.payload);
      if (index !== -1) {
        state.blockedUsers.splice(index, 1);
      }
    },
    fillIgnoredUsers: (state, action) => {
      state.ignoredUsers = action.payload
    },
    reduceIgnoredUsers: (state, action) => {
      const index = state.ignoredUsers.findIndex((user) => user.username == action.payload);
      if (index !== -1) {
        state.ignoredUsers.splice(index, 1);
      }
    },
    toggleBlockedUsersPopup: (state, action) => {
      state.blockedUsersPopup = action.payload
    },
    toggleIgnoredUsersPopup: (state, action) => {
      state.ignoredUsersPopup = action.payload
    },
    toggleLoadingBlockedUsers: (state, action) => {
      state.loadingBlockedUsers = action.payload
    },
    toggleLoadingIgnoredUsers: (state, action) => {
      state.loadingIgnoredUsers = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setPane, 
  setPaneList, 
  setActionOutput,
  setPendingContacts,
  fillFollowers, 
  fillPaginatedFollowers,
  fillFollowings, 
  fillFollowerRequests,
  fillSentRequests,
  setAbilities,
  modifyAbilities,
  setLoading, 
  toggleLoadingAbilities,
  removeFollowerFromList,
  removeFollowingUserFromList,
  removeFollowerRequest,
  removeFollowingRequest,
  fillBlockedUsers,
  reduceBlockedUsers,
  fillIgnoredUsers,
  reduceIgnoredUsers,
  toggleBlockedUsersPopup,
  toggleIgnoredUsersPopup,
  toggleLoadingBlockedUsers,
  toggleLoadingIgnoredUsers,
  countFollowersPaginationPage,
  fillPaginatedFollowings,
  countFollowingsPaginationPage,
  fillPaginatedFollowerRequests,
  countFollowerRequestsPaginationPage,
  fillPaginatedFollowingRequests,
  countFollowingRequestsPaginationPage,
} = contactsSlice.actions

export default contactsSlice.reducer