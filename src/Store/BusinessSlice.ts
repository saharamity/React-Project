import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../Types/TUser";


const initialState = {
    isBusiness: false,
    user: null as TUser | null
};

const BusinessSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
    business: (state: TBusinessState, data: PayloadAction<TUser>) => {
        state.isBusiness = true;
        state.user = data.payload;
    }
    },
});

export const businessActions = BusinessSlice.actions;
export default BusinessSlice.reducer;
export type TBusinessState = typeof initialState;