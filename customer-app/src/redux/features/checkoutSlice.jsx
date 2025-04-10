import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const checkoutSlice = createSlice({
    name: 'checkoutSlice',
    initialState,
    reducers: {
        addData: (state, action) => {
            return action.payload
        },
        clearData: (state) => {
            return [];
        }
    }
})

export const {addData, clearData} = checkoutSlice.actions;
export const listProduct = (state) => state.checkoutSlice;

export default checkoutSlice.reducer;
