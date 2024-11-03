import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialStateSearch = {
    search:""
}
const SearchSlice = createSlice({
    name: "search",
    initialState: initialStateSearch,
    reducers:{
        searchWord: (state: TSearchState, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
        }
)

export type TSearchState = typeof initialStateSearch;
export const searchAction = SearchSlice.actions;
export default SearchSlice.reducer;

