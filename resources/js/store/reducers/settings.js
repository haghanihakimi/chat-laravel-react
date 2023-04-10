import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    form: {
        firstname: '',
        surname: '',
        username: '',
        email: '',
        currentPassword: '',
        password: '',
        confirm_password: '',
        gender: 'female',
    },
  },
  reducers: {
    getForm: (state) => {
        return state.form
    },
    setForm: (state, action) => {
        switch (action.payload.input) {
            case 'firstname':
                state.form.firstname = action.payload.entry;
                break;
            case 'surname':
                state.form.surname = action.payload.entry;
                break;
            case 'username':
                state.form.username = action.payload.entry;
                break;
            case 'email':
                state.form.email = action.payload.entry;
                break;
            case 'currentPassword':
                state.form.currentPassword = action.payload.entry;
                break;
            case 'password':
                state.form.password = action.payload.entry;
                break;
            case 'confirm_password':
                state.form.confirm_password = action.payload.entry;
                break;
            case 'gender':
                state.form.gender = action.payload.entry;
                break;
            default:
                alert('Invalid input selected!');
                break;
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { getForm, setForm } = settingsSlice.actions

export default settingsSlice.reducer