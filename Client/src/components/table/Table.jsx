import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useState, useRef } from "react";
import { columns, ROW_HEIGHT, COLOR_MAPPING } from "./tableConstants";
import { useSelector } from "react-redux";

const Table = ({ todoStatus }) => {
  const [rowData, setRowData] = useState([]);
  const { items = [], searchKeyword = "" } = useSelector((state) => state.todo);
  const gridRef = useRef(null); // Reference to the AG Grid instance
  const gridColorByPriority = useSelector(
    (state) => state.generalSettings?.gridColorByPriority
  );

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
    var defaultSortModel = [{ colId: "createdAt", sort: "desc", sortIndex: 0 }];
    params.api.applyColumnState({ state: defaultSortModel });
  };

  const gridOptions = {
    suppressCellFocus: true, // Disable cell selection at the grid level
    getRowStyle: (params) => {
      if (params.data.currentState === "completed") {
        return { backgroundColor: "#AFE1AF" };
      } else if (gridColorByPriority) {
        const status = params.data.priority?.toLowerCase();
        return { backgroundColor: COLOR_MAPPING[status] };
      }
    },
  };

  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact
        ref={gridRef}
        key={gridColorByPriority}
        rowData={rowData}
        columnDefs={columns}
        gridOptions={gridOptions}
        // pagination={true}
        rowHeight={ROW_HEIGHT}
        autoSizeAllColumns={true}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default Table;
