import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],

  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    addTodo: async (state, action) => {
      const { title, description, dueDate, priority } = action.payload;
      try {
        const response = await axios.post("http://localhost:3000/todos", {
          title,
          description,
          dueDate,
          priority,
          completed: false,
        });
        state.push(response.data);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    toggleComplete: async (state, action) => {
      try {
        const response = await axios.patch(
          `http://localhost:3000/todos/${action.payload.id}`,
          {
            completed: action.payload.completed,
          }
        );
        // Update the state if needed
      } catch (error) {
        console.error("Error toggling complete:", error);
      }
    },
    deleteTodo: async (state, action) => {
      try {
        await axios.delete(`http://localhost:3000/todos/${action.payload.id}`);
        // Remove the item from state if needed
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
  },
});

// Thunk function for fetching todos from JSON Server
export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/todos");
    dispatch(setTodos(response.data));
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const { addTodo, toggleComplete, deleteTodo, setTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
