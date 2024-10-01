import { createSlice } from "@reduxjs/toolkit";
import { User } from "@prisma/client";
import { authApi } from "../../services/authApi";
import { RootState } from "../../store/store";

interface InitialState {
    user: User & { token: string } | null;
    isAuthenticated: boolean;
}


const initialState: InitialState = {
    //инициализация хранилища
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
            state.user =action.payload
            state.isAuthenticated = true
        })
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.user =action.payload
            state.isAuthenticated = true
        })
        builder.addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
            state.user =action.payload
            state.isAuthenticated = true
        })
    }
})

//для вызова  в  компонентах
export const {logout} = authSlice.actions


export default authSlice.reducer

//для извлечения информации о том, аутентифицирован ли пользователь.
export const  selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const  selectUser = (state: RootState) => state.auth.user