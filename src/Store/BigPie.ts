import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import SearchSlice from "./SearchSlice";
import BusinessSlice from "./BusinessSlice";

const store = configureStore({
    reducer : {UserSlice, SearchSlice, BusinessSlice},
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    },
});
const rootReducer = combineReducers({UserSlice, SearchSlice, BusinessSlice});
export type TRootState = ReturnType <typeof rootReducer>;
export default store;