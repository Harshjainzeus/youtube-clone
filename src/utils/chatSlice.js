import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:[],
    reducers:{
        addChat:(state,action)=>{
            state.splice(20,1);
            state.unshift(action.payload)
            // state.push(action.payload)
        }
    }
})

export const {addChat} = chatSlice.actions
export default chatSlice.reducer