import { createSlice } from '@reduxjs/toolkit'

export const registrationSlice = createSlice({
  name: 'auth',
  initialState: {
    form: {
        fname: '',
        sname: '',
        email: '',
        password: '',
        gender: 'female',
    },
  },
  reducers: {
    getForm: (state) => {
        return state.form
    },
    setForm: (state, action) => {
        switch (action.payload.input) {
            case 'fname':
                state.form.fname = action.payload.entry;
                break;
            case 'sname':
                state.form.sname = action.payload.entry;
                break;
            case 'email':
                state.form.email = action.payload.entry;
                break;
            case 'password':
                state.form.password = action.payload.entry;
                break;
            case 'username':
                state.form.username = action.payload.entry;
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
export const { getForm, setForm } = registrationSlice.actions

export default registrationSlice.reducer