import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";



export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    //вход в систему
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()
          // проверяется, есть ли токен в данных, которые пришли с действием
        if (action.payload.token) {
            localStorage.setItem('token', action.payload.token)
        }
    }
})