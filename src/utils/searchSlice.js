 import { createSlice } from "@reduxjs/toolkit";
 
 const searchSlice = createSlice(
    {
        name: "search",
        initialState: {},
        reducers: {
            storeResults: (state,action) => {
                // const payload = action.payload;
                // state = {...action.payload, ...state}
                // const newState = {...payload, ...state}
                // return newState;
                Object.assign(state,action.payload)
            }
          
        }

    }
 )

 export const {storeResults, clearResults} = searchSlice.actions;

 export default searchSlice.reducer;