import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: '', isLoggedIn: false },
    reducers: {
        login(state, action) {
            state.user = action.payload; // Store user ID
            state.isLoggedIn = true;
        },
        logout(state) {
            state.user = '';
            state.isLoggedIn = false;
            window.location.reload(); // Reload the page after logout
        }
    }
});
// Exporting actions
export const authActions = authSlice.actions;

// Creating the store properly
export const store = configureStore({
    reducer: { auth: authSlice.reducer },
});

export default store;








