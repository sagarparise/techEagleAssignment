import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: []
  },
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
 
      state.todos = state.todos.filter((todo) => todo._id!== action.payload);
    }
  }
})

export const { getTodos, addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;