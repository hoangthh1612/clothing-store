import { createSlice } from "@reduxjs/toolkit";

const initialState = {value: false}

const isAddtoCartSlice = createSlice({
    name: 'isAddtoCartSlice',
    initialState,
    reducers: {
        click: (state) => {
            state.value = true;
        },
        stop: (state) => {
            state.value = false;
        }
    }
})

export const {click, stop} = isAddtoCartSlice.actions;
export const listProduct = (state) => state.isAddtoCartSlice;

export default isAddtoCartSlice.reducer;
