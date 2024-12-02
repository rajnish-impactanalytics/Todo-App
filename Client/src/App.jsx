// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import { getTodos, createTodo } from "./services/api";
import Header from "./components/Header";
import Tab from "./components/Tab";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { taskData } from "./components/table/constants";
import { debounce } from "lodash";
import Modal from "./components/Modal";

function App() {
  const [todos, setTodos] = useState(taskData || []);
  const [newTodo, setNewTodo] = useState("");
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  // Update the search keyword and filter data based on it
  const handleSearchChange = useCallback(
    debounce((keyword) => {
      const filtered = taskData?.filter(
        (item) =>
          item?.title?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
          item?.description?.toLowerCase()?.includes(keyword?.toLowerCase())
      );
      setTodos(filtered);
    }, 300), // 300ms debounce delay
    [taskData] // Only recreate the debounced function if taskData changes
  );

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
      <Header onSearchChange={handleSearchChange} setOpenModal={setOpenModal} />
      <Tab taskData={todos} value={value} setValue={setValue} />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
      <Footer />
    </Box>
  );
}

export default App;
