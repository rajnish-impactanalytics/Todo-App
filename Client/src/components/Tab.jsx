import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "./table/Table";
import { cloneDeep } from "lodash";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({ taskData, value, setValue }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredData = useMemo(() => {
    if (!taskData || taskData.length === 0) return []; // Early return for empty taskData

    const clonedData = cloneDeep(taskData) || [];
    return clonedData.filter((task) => {
      const taskState = task.currentState
        ? task.currentState.toLowerCase()
        : "";
      switch (value) {
        case 0:
          return taskState === "todo";
        case 1:
          return taskState === "completed";
        default:
          return true;
      }
    });
  }, [taskData, value]);

  return (
    <Box sx={{ flexGrow: 1, width: "100%", height: "calc(100dvh - 144px)" }}>
      <AppBar sx={{ bgcolor: "background.paper" }} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Todo" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
          <Tab label="All" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Table data={filteredData} />
    </Box>
  );
}
