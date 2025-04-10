import { createSlice } from "@reduxjs/toolkit";

const initialState:any = []

const selectedProduct = createSlice({
    name: 'selectedProduct',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            return action.payload
        },
        clearProduct: (state) => {
            return [];
        }
    }
})

export const {addProduct, clearProduct} = selectedProduct.actions;
export const listProduct = (state:any) => state.selectedProduct;

export default selectedProduct.reducer;
