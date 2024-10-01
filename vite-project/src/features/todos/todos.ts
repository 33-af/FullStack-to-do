import { Todo } from "@prisma/client";
import { api } from "../../services/api";


export const TodosAPi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodos: builder.query<Todo[], void>({
            query: () => ({
                url: '/todos',
                method: "GET"
            })
        }),
        getTodo: builder.query<Todo[], string>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "GET"
            })
        }),
        editTodo: builder.mutation<string, Todo>({
            query: (todo) => ({
                url: `/todos/edit/${todo.id}`,
                method: "PUT",
                body: todo
            })
        }),

        removeTodo: builder.mutation<string, string>({
            query: (id) => ({
                url: `/todos/remove/${id}`,
                method: "POST",
                body: { id }
            })
        }),
        addTodo: builder.mutation<Todo, Todo>({
            query: (todo) => ({
                url: '/todos/add',
                method: "POST",
                body: todo
            })
        })
    })
})

export const { useAddTodoMutation, useEditTodoMutation, useGetAllTodosQuery, useGetTodoQuery, useRemoveTodoMutation } = TodosAPi;
export const {
    endpoints: {
        getAllTodos,
        getTodo,
        editTodo,
        removeTodo,
        addTodo
    }
} = TodosAPi;