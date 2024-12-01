import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useState } from "react";
import { columns, rowHeight } from "./constants";

const Table = ({ taskData }) => {
  const [rowData, setRowData] = useState(taskData); //The data to be displayed.
  // Fetch data & update rowData state
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/space-mission-data.json") // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => console.log(rowData)); // Update state of `rowData`
  }, []);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit(); // Resize columns on grid initialization
    var defaultSortModel = [{ colId: "dueDate", sort: "asc", sortIndex: 0 }];
    params.api.applyColumnState({ state: defaultSortModel });
  };

  const gridOptions = {
    suppressCellFocus: true, // Disable cell selection at the grid level
  };

  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        gridOptions={gridOptions}
        // pagination={true}
        rowHeight={rowHeight}
        autoSizeAllColumns={true}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default Table;
