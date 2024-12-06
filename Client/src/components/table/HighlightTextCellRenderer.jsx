import React from "react";
import { useSelector } from "react-redux";

const HighlightTextCellRenderer = (props) => {
  const { value } = props;
  const searchKeyword = useSelector((state) => state.todo.searchKeyword);

  // Function to highlight matching text
  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi"); // Match keyword case-insensitive
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return <span>{highlightText(value, searchKeyword)}</span>;
};

export default HighlightTextCellRenderer;
