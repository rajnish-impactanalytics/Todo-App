import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import DateTimePicker from "./DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateField } from "../utils/redux/modalSlice";
import { addTodo } from "../utils/redux/todoSlice";
import { delaySimulation } from "../utils/utils";
import { displaySnackMessage } from "../utils/utils";

const CustomModal = () => {
  const { isOpen, mode, formState } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isViewMode = mode === "view";

  const handleClose = (clearData = false) => {
    dispatch(closeModal({ clearData: clearData }));
  };

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleSave = async () => {
    if (mode === "create") {
      if (
        formState.title.trim().length < 10 ||
        formState.description.trim().length < 10
      ) {
        displaySnackMessage(
          dispatch,
          "Title and Description should be atleast 10 characters long",
          "error"
        );
        return;
      }
      setLoading(true);
      await delaySimulation(2000);
      dispatch(
        addTodo({
          id: new Date().getTime(), // Generate a unique ID for the new item
          title: formState.title,
          description: formState.description,
          dueDate: formState.dueDate,
          priority: formState.priority,
          currentState: "todo",
          createdAt: new Date().toISOString(),
        })
      );
      setLoading(false);
      displaySnackMessage(dispatch, "Task added successfully!", "success");
    }
    handleClose(true); // Close the modal
  };

  const handleUpdate = async () => {
    if (mode === "edit") {
      if (
        formState.title.trim().length < 10 ||
        formState.description.trim().length < 10
      ) {
        displaySnackMessage(
          dispatch,
          "Title and Description should be atleast 10 characters long",
          "error"
        );
        return;
      }
      setLoading(true);
      await delaySimulation(2000);
      dispatch(
        updateTodo({
          id: formState.id,
          title: formState.title,
          description: formState.description,
          dueDate: formState.dueDate,
          priority: formState.priority,
        })
      );
      setLoading(false);
      displaySnackMessage(dispatch, "Task updated successfully!", "success");
    }
    handleClose(true); // Close the modal
  };

  return (
    <Dialog
      keepMounted
      open={isOpen}
      onClose={(e, reason) => handleClose(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {mode === "create"
          ? "Create Task"
          : mode === "edit"
          ? "Edit Task"
          : "View Task"}
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Title"
          value={formState.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          fullWidth
          required
          inputProps={{
            maxLength: 140,
            minLength: 10,
          }}
          margin="dense"
          disabled={isViewMode}
        />
        <TextField
          label="Description"
          value={formState.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          required
          fullWidth
          multiline
          rows={4}
          inputProps={{
            maxLength: 500,
            minLength: 10,
          }}
          margin="dense"
          disabled={isViewMode}
        />
        <DateTimePicker
          label="Due Date"
          value={formState.dueDate}
          onChange={(value) => handleInputChange("dueDate", value)}
          disabled={isViewMode}
        />
        <TextField
          select
          label="Priority"
          value={formState.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          fullWidth
          margin="dense"
          disabled={isViewMode}
        >
          {["None", "Low", "Medium", "High"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {isViewMode && (
          <>
            <TextField
              label="Created On"
              value={formState.createdOn || "-"}
              fullWidth
              disabled={true}
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Current State"
              value={formState.currentState || "Open"}
              fullWidth
              disabled={true}
              margin="dense"
              InputProps={{ readOnly: true }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={(e, reason) => handleClose(true)}
          color="error"
        >
          Cancel
        </Button>
        {!isViewMode && (
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            onClick={() =>
              mode === "create"
                ? handleSave(formState)
                : handleUpdate(formState)
            }
            color="primary"
            disabled={isViewMode}
          >
            {mode === "create" ? "Save" : "Update"}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
