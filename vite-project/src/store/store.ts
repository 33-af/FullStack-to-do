import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import auth from '../features/auth/authSlice'
import { api } from '../services/api'
import { listenerMiddleware } from '../middleware/authMiddleware'
import todos from '../features/todos/todosSlice'


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    todos
  },
  middleware: (getDefaultMidleware) =>
    getDefaultMidleware()
  // второстепенность
      .concat(api.middleware)
      //первоступенность
      .prepend(listenerMiddleware.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>