// src/App.jsx
import React, { useState, useEffect } from "react";
import { getTodos, createTodo } from "./services/api";
import Header from "./components/Header";
import Tab from "./components/Tab";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { taskData} from "./components/table/constants";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Fetch the todos from the API when the component mounts
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        // setTodos(todos);
        setNewTodo(taskData);
      } catch (error) {
        console.error("Failed to load todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      const createdTodo = await createTodo({ text: newTodo });
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      setNewTodo("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh", // Full viewport height
      }}
    >
      <Header />
      <Tab taskData={taskData}/>
      <Footer />
    </Box>
  );
}

export default App;
