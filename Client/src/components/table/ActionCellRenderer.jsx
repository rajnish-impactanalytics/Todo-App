import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ReplayIcon from "@mui/icons-material/Replay";
import { useDispatch } from "react-redux";
import { removeTodo, toggleTodo } from "../../utils/redux/todoSlice";
import { openModal } from "../../utils/redux/modalSlice";
import { displaySnackMessage } from "../../utils/utils";

// Custom cell renderer for the Actions column
const ActionCellRenderer = (params) => {
  const { data } = params;
  const dispatch = useDispatch();
  const isCompleted = data.currentState === "completed";

  // Edit task - open modal in edit mode
  const onEdit = (data) => {
    dispatch(
      openModal({
        mode: "edit",
        data,
      })
    );
  };

  // Delete task - update Redux state
  const onDelete = (data) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(removeTodo({ id: data.id }));
      displaySnackMessage(dispatch, "Task deleted", "success");
    }
  };

  // View task - open modal in view mode
  const onView = (data) => {
    dispatch(
      openModal({
        mode: "view",
        data,
      })
    );
  };

  // Toggle task state (Completed/Active)
  const onToggle = (data) => {
    dispatch(
      toggleTodo({
        id: data.id,
      })
    );
    const message = isCompleted
      ? "Task marked as todo"
      : "Task marked as completed";
    displaySnackMessage(dispatch, message, "success");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      {/* Edit Button */}
      <IconButton color="primary" onClick={() => onEdit(data)}>
        <EditIcon />
      </IconButton>

      {/* Delete Button */}
      <IconButton sx={{ color: "#da2229" }} onClick={() => onDelete(data)}>
        <DeleteIcon />
      </IconButton>

      {/* View Button */}
      <IconButton color="primary" onClick={() => onView(data)}>
        <VisibilityIcon />
      </IconButton>

      {/* Toggle Task Button */}
      <IconButton color="primary" onClick={() => onToggle(data)}>
        {isCompleted ? <ReplayIcon /> : <TaskAltIcon />}
      </IconButton>
    </div>
  );
};

export default ActionCellRenderer;
