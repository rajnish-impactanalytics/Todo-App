// src/features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { taskData } from "../../components/table/tableConstants";

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("https://api.example.com/todos"); // Replace with your API endpoint
  return response.data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    searchKeyword: "",
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    updateTodo: (state, action) => {
      const {
        id,
        title,
        description,
        dueDate = "-",
        priority,
        currentState,
      } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          title,
          description,
          dueDate,
          priority,
          currentState,
        };
      }
    },
    removeTodo: (state, action) => {
      const index = state.items.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.currentState = todo.currentState === "todo" ? "completed" : "todo";
      }
    },
    updateSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched todos to the array
        // state.items = action.payload;
        state.items = taskData;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.items = taskData;
        state.error = action.error.message;
      });
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
  updateSearchKeyword,
} = todosSlice.actions;
export default todosSlice.reducer;
