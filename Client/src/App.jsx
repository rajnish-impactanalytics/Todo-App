// src/App.jsx
import React, { useState, useEffect, Suspense, useMemo, useRef } from "react";
import Header from "./components/Header";
import Tab from "./components/Tab";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
const Modal = React.lazy(() => import("./components/Modal"));
import { Typography, Backdrop, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "./utils/redux/todoSlice";
import Snackbar from "./components/Snackbar";
import {
  KEYBOARD_SHORTCUT_CONFIGURATION,
  BLACKLISTED_DOM_TARGETS,
  MODIFIER_MAP,
} from "./constants/globalConstants";
import { overrideSystemShortcut, getKeyboardShortcuts } from "./utils/utils";

function App() {
  const [showBackdrop, setShowBackdrop] = useState(true); //intial loading state
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.todo);
  const headerRef = useRef(null);
  const KEYBOARD_SHORTCUTS = useMemo(() => getKeyboardShortcuts(), []); //memoize keyboard shortcuts

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

    document.addEventListener("keydown", handleKeyDown); //for keyboard shortcuts

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(setT);
    };
  }, []);

  const handleKeyDown = (event) => {
    //trigger shortcut only once, if key kept pressed for better app performance
    if (
      (KEYBOARD_SHORTCUT_CONFIGURATION.ignoreInputFields &&
        BLACKLISTED_DOM_TARGETS.indexOf(event.target.tagName) >= 0) ||
      (!KEYBOARD_SHORTCUT_CONFIGURATION.repeatOnHold && event.repeat)
    ) {
      return;
    }

    //extract key combination
    const keyCombination = new Set();

    if (event.ctrlKey) keyCombination.add("Control");
    if (event.metaKey) keyCombination.add("Meta");
    if (event.altKey) keyCombination.add("Alt");
    if (event.shiftKey) keyCombination.add("Shift");
    keyCombination.add(
      MODIFIER_MAP[event.code] || event.code?.replace(/^(Key|Digit)/, "")
    );

    const matchedShortcutKey = Object.keys(KEYBOARD_SHORTCUTS).find((key) => {
      const shortcut = KEYBOARD_SHORTCUTS[key];
      return (
        shortcut.length === keyCombination.size &&
        shortcut.every((k) => keyCombination.has(k))
      );
    });
    //if matched shortcut key, override system shortcut
    if (
      matchedShortcutKey &&
      KEYBOARD_SHORTCUT_CONFIGURATION.overrideSystemShorcut
    ) {
      overrideSystemShortcut(event);
    }

    switch (matchedShortcutKey) {
      case "search": // Ctrl + Shift + S to trigger search
        if (headerRef.current) {
          headerRef.current.focusSearchInput(); // Trigger the focus method
        }
        break;
      case "createTask": // Ctrl + Shift + C to create a task
        if (headerRef.current) {
          headerRef.current.openModal(); // Trigger the focus method
        }
        break;
      case "toggleGridColor": // Ctrl + Shift + I to toggle grid color by priority
        if (headerRef.current) {
          headerRef.current.toggleGridColor();
        }
        break;
      default:
        break;
    }
  };

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
      <Header ref={headerRef} />
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
