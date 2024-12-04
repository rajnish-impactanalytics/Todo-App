import React from "react";
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

const CustomModal = ({
  openModal,
  toggleModal,
  mode = "create",
  onSave,
  formState = {},
  handleInputChange,
  loading,
}) => {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  return (
    <Dialog
      keepMounted
      open={openModal}
      onClose={toggleModal}
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
              value={formState.createdOn || "N/A"}
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
          onClick={(e) => toggleModal(e, true)}
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
            onClick={() => onSave(formState)}
            color="primary"
            disabled={
              !formState.title ||
              formState.title.trim().length < 10 ||
              formState.description.trim().length < 10
            }
          >
            Save
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
