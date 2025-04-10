import {createSlice} from "@reduxjs/toolkit";

type SubSetupType = {
    isSubmitted: boolean
    title: string
    description: string
    thumbnail: string | null
}

type SetupType = {
    setup: SubSetupType
}

const initialState: SetupType = {
    setup: {
        isSubmitted: false,
        title: '',
        description: '',
        thumbnail: null,
    }
};

const livestreamSlice = createSlice({
    initialState,
    name: 'livestream',
    reducers: {
        setSetup: (state, action) => {
            state.setup ={...action.payload, isSubmitted: true}
        }
    }
})

export const {setSetup} = livestreamSlice.actions;
export const setup = (state:any) => state.livestream.setup;

export default livestreamSlice.reducer;