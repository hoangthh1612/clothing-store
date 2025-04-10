import { createSlice } from "@reduxjs/toolkit"

type openSliceType = {
    isOpenModal: boolean
} 
const initialState:openSliceType = {
    isOpenModal: false,
}

const openModalSlice = createSlice({
    name: 'openModal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpenModal = true
        },
        closeModal: (state) => {
            state.isOpenModal = false
        }
    }


})

export const {openModal, closeModal} = openModalSlice.actions;
export const isOpenModal = (state:any) => state.openModal?.isOpenModal;
export default openModalSlice.reducer;