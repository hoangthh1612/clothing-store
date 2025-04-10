import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

const counterSlice = createSlice({
    initialState,
    name: 'counter',
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
})

export const {increment, decrement} = counterSlice.actions;
export const currentCount = (state:any) => state.counter.value;

export default counterSlice.reducer;

