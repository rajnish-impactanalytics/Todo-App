// src/App.jsx
import React, { useState, useEffect, Suspense } from "react";
import Header from "./components/Header";
import Tab from "./components/Tab";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
const Modal = React.lazy(() => import("./components/Modal"));
import { Typography, Backdrop, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "./utils/redux/todoSlice";
import Snackbar from "./components/Snackbar";

function App() {
  const [showBackdrop, setShowBackdrop] = useState(false); //intial loading state
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.todo);

  //fetch data using thunk middleware and store data in redux store
  //backdrop loader can be based on status extracted from redux store,
  //though we are using simulation using setTimeout as we don't have actual API
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const setT = setTimeout(() => {
      setShowBackdrop(false);
    }, 3000);
    return () => clearTimeout(setT);
  }, []);

  return showBackdrop ? (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={showBackdrop}
    >
      <CircularProgress color="inherit" />
      <Typography sx={{ mt: 2 }}>Loading...</Typography>{" "}
    </Backdrop>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh", // Full viewport height
      }}
    >
      <Snackbar />
      <Header />
      <Tab />
      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress color="inherit" />
            <Typography sx={{ mt: 2 }}>Loading...</Typography>{" "}
          </Box>
        }
      >
        <Modal />
      </Suspense>
      <Footer />
    </Box>
  );
}

export default App;
