import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useState } from "react";
import { columns, rowHeight } from "./tableConstants";
import { useSelector } from "react-redux";

const Table = ({ todoStatus }) => {
  const [rowData, setRowData] = useState([]);
  const { items = [], searchKeyword = "" } = useSelector((state) => state.todo);

  useEffect(() => {
    const currentTabTodos = items?.filter((item) =>
      todoStatus !== "all" ? item?.currentState === todoStatus : item
    );
    if (!searchKeyword?.length) {
      setRowData(currentTabTodos);
      return;
    }

    const filteredTodos = currentTabTodos?.filter(
      (item) =>
        item?.title?.toLowerCase()?.includes(searchKeyword?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(searchKeyword?.toLowerCase())
    );
    setRowData(filteredTodos);
  }, [items, searchKeyword, todoStatus]);

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
