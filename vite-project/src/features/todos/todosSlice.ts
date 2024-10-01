
import { Todo } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { TodosAPi } from "./todos";
import { RootState } from "../../store/store";



interface IInitialState {
    todos: Todo[] | null
}

const initialState: IInitialState = {
    todos: null,
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addMatcher(TodosAPi.endpoints.getAllTodos.matchFulfilled, (state, action) => {
                state.todos=action.payload
            })
    },
})

export default todosSlice.reducer;
export const  selectTodos = (state: RootState) => state.todos