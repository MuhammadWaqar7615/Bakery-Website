import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    currentEmail: null,
}

const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { email, updates, cards } = action.payload;
            const existingUserIndex = state.users.findIndex(user => user.email === email);
            if(existingUserIndex !== -1) {
                state.users[existingUserIndex] = {
                    ...state.users[existingUserIndex],
                    ...updates,
                    cards: cards
                };
            } else {
                const  newUser = {
                    email, 
                    selectedBgColor: "#FFFFFF",
                    selectedFontColor: "#FFFFFF",
                    selectedAdColor: "#933C24",
                    selectedPrimaryColor: "#000000",
                    selectedSecondaryColor: "#FFFFFF",
                    ...updates,
                    cards: [true, true, true, true]
                }
                state.users.push(newUser);
            }
        },
        setCurrentEmail: (state, action) => {
            state.currentEmail = action.payload
        }
    },
})

export const { updateUser, setCurrentEmail } = colorSlice.actions;
export default colorSlice.reducer;