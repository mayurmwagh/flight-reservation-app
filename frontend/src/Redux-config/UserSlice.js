import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"user",
    initialState:{
        isLoggedIn:false,
        email:null,
        token:null,
        roles:[],
        id:null,
        username:null,
    },
    reducers:{
        setUser: (state, action)=>{
            let {email, token, roles, id, username} = action.payload;
            state.email= email;
            state.token= token;
            state.roles= roles;
            state.isLoggedIn = true;
            state.username= username;
            state.id= id;
            
        },
        signOut:(state, action)=>{
            state.email=null;
            state.token=null;
            state.roles=[];
            state.isLoggedIn=false;
            state.username=null;
            state.id=null;
            
        }
    }
});

export const {setUser, signOut}= slice.actions;
export default slice.reducer;