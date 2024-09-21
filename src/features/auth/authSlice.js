import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        login: (state, action) => {
            
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const { logout, login, loginFail } = authSlice.actions;

export default authSlice.reducer;