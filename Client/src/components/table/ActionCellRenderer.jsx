import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; // For Close/Open
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ReplayIcon from "@mui/icons-material/Replay";

// Custom cell renderer for the Actions column
const ActionCellRenderer = (params) => {
  const { data } = params;
  const isCompleted = data.currentState === "Completed"; // Check task state

  const onEdit = (data) => {
    console.log("Edit task:", data);
  };

  const onDelete = (data) => {
    console.log("Delete task:", data);
  };

  const onView = (data) => {
    console.log("View task:", data);
  };

  const onToggle = (data) => {
    console.log("Toggle task:", data);
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

      {/* Close/Open Toggle Button */}
      <IconButton color="primary" onClick={() => onView(data)}>
        <VisibilityIcon />
      </IconButton>

      {/* Task Button */}
      <IconButton color="primary" onClick={() => onToggle(data)}>
        {isCompleted ? <ReplayIcon /> : <TaskAltIcon />}
      </IconButton>
    </div>
  );
};
export default ActionCellRenderer;
