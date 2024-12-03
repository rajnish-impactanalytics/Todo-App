// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import { getTodos, createTodo } from "./services/api";
import Header from "./components/Header";
import Tab from "./components/Tab";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { taskData } from "./components/table/tableConstants";
import { debounce } from "lodash";
import Modal from "./components/Modal";
import { DEFAULT_MODAL_DATA } from "./constants/globalConstants";
import dayjs from "dayjs";
import SnackMessageProvider from "./components/SnackMessage";
import { delaySimulation } from "./services/utils";

function App() {
  const [todos, setTodos] = useState(taskData || []);
  const [newTodo, setNewTodo] = useState("");
  const [value, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [formState, setFormState] = useState(DEFAULT_MODAL_DATA);
  const [loading, setLoading] = useState(false);
  const [snackData, setSnackData] = useState(null);

  const toggleModal = (e, resetState = false) => {
    setOpenModal((prev) => !prev);
    if (resetState === true) setFormState(DEFAULT_MODAL_DATA);
  };

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabValue = (event, newTabValue) => setTabValue(newTabValue);

  const showSnackMessage = (msg, variant) => {
    setSnackData(null);
    setSnackData({ msg, variant });
  };

  useEffect(() => {
    if (snackData) {
      const timer = setTimeout(() => {
        setSnackData(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackData]);
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

  const handleSave = async () => {
    setLoading(true);

    try {
      // Format data from formState
      const formattedData = {
        currentState: "todo",
        title: formState.title,
        description: formState.description,
        createdAt: dayjs(),
        dueDate: formState.dueDate || "N/A",
        priority: formState.priority,
      };

      // Update todos
      setTodos((prevTodos) => [...prevTodos, formattedData]);
      showSnackMessage("Task added successfully!", "success");
      await delaySimulation(2000);
      setLoading(false);
      toggleModal(null, true);
    } catch (error) {
      console.error("Error saving data:", error);
      setLoading(false);
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
      {snackData && (
        <SnackMessageProvider msg={snackData.msg} variant={snackData.variant} />
      )}
      <Header onSearchChange={handleSearchChange} setOpenModal={setOpenModal} />
      <Tab taskData={todos} value={value} handleTabValue={handleTabValue} />
      <Modal
        openModal={openModal}
        toggleModal={toggleModal}
        onSave={handleSave}
        formState={formState}
        handleInputChange={handleInputChange}
        loading={loading}
      />
      <Footer />
    </Box>
  );
}

export default App;
