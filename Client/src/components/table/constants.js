import ActionCellRenderer from "./ActionCellRenderer";

export const taskData = [
  {
    currentState: "open",
    title: "Set up development environment",
    description:
      "Install Node.js, MongoDB, and set up the basic structure for the MERN stack application.",
    createdAt: "2024-11-01",
    dueDate: "2024-11-02",
    priority: "High",
  },
  {
    currentState: "completed",
    title: "Create project structure",
    description:
      "Initialize a GitHub repository and scaffold the basic project structure for both frontend and backend.",
    createdAt: "2024-11-02",
    dueDate: "2024-11-03",
    priority: "High",
  },
  {
    currentState: "completed",
    title: "Install dependencies",
    description:
      "Install necessary dependencies for backend (Express, Mongoose, etc.) and frontend (React, Axios, MUI).",
    createdAt: "2024-11-03",
    dueDate: "2024-11-04",
    priority: "High",
  },
  {
    currentState: "open",
    title: "Set up MongoDB connection",
    description:
      "Configure MongoDB database with Mongoose for handling data storage and connections.",
    createdAt: "2024-11-04",
    dueDate: "2024-11-06",
    priority: "High",
  },
  {
    currentState: "open",
    title: "Create API routes (CRUD)",
    description:
      "Create the RESTful API routes (GET, POST, PUT, DELETE) to handle tasks in the ToDo application.",
    createdAt: "2024-11-06",
    dueDate: "2024-11-10",
    priority: "High",
  },
  {
    currentState: "open",
    title: "Set up React components for UI",
    description:
      "Set up React components such as TaskList, TaskItem, TaskForm for the UI.",
    createdAt: "2024-11-10",
    dueDate: "2024-11-12",
    priority: "Medium",
  },
  {
    currentState: "open",
    title: "Implement state management with Redux",
    description:
      "Install Redux and set up state management for the ToDo list (e.g., tasks, current task, etc.).",
    createdAt: "2024-11-12",
    dueDate: "2024-11-15",
    priority: "Medium",
  },
  {
    currentState: "open",
    title: "Design UI layout",
    description:
      "Design the basic UI layout for the ToDo app using Material UI (MUI). Create a clean, responsive design.",
    createdAt: "2024-11-15",
    dueDate: "2024-11-18",
    priority: "Medium",
  },
  {
    currentState: "open",
    title: "Connect frontend to backend API",
    description:
      "Integrate the React components with the backend API using Axios to fetch, add, and update tasks.",
    createdAt: "2024-11-18",
    dueDate: "2024-11-20",
    priority: "High",
  },
  {
    currentState: "open",
    title: "Implement Task completion feature",
    description: "Add functionality for marking tasks as completed or pending.",
    createdAt: "2024-11-20",
    dueDate: "2024-11-22",
    priority: "Medium",
  },
  {
    currentState: "open",
    title: "User authentication",
    description:
      "Implement user authentication (register, login, JWT token) to allow users to sign in and manage their tasks.",
    createdAt: "2024-11-22",
    dueDate: "2024-11-25",
    priority: "High",
  },
  {
    currentState: "open",
    title: "Implement task priority feature",
    description:
      "Add the ability to set a priority level (High, Medium, Low) for tasks and display accordingly.",
    createdAt: "2024-11-25",
    dueDate: "2024-11-27",
    priority: "Medium",
  },
  {
    currentState: "open",
    title: "Implement task filtering",
    description:
      "Create a feature to filter tasks by their status (completed, pending) or by priority.",
    createdAt: "2024-11-27",
    dueDate: "2024-11-30",
    priority: "Low",
  },
  {
    currentState: "open",
    title: "Implement task due date functionality",
    description:
      "Add functionality to set and display due dates for each task. Highlight overdue tasks.",
    createdAt: "2024-11-30",
    dueDate: "2024-12-02",
    priority: "Low",
  },
  {
    currentState: "open",
    title: "Testing and Bug fixing",
    description:
      "Test the app for bugs, edge cases, and fix any issues. Write unit tests for backend API routes.",
    createdAt: "2024-12-02",
    dueDate: "2024-12-05",
    priority: "High",
  },
  {
    currentState: "open",
    title: "Deploy application to production",
    description:
      "Deploy the app to a cloud provider (e.g., Heroku, AWS). Ensure all configurations are correct.",
    createdAt: "2024-12-05",
    dueDate: "2024-12-08",
    priority: "High",
  },
];

export const columns = [
  {
    headerName: "Title",
    field: "title",
    sortable: true,
    // filter: true,
    tooltipField: "title",
    width: 300,
    cellStyle: {
      // Custom style for the cell
      fontWeight: "600",
      color: "#555",
    },
    lockPosition: "left",
    tooltipValueGetter: (params) => params.value, // Display full text in tooltip
  },
  {
    headerName: "Priority",
    field: "priority",
    sortable: true,
    comparator: (valueA, valueB) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 }; // Priority order
      return priorityOrder[valueB] - priorityOrder[valueA]; // Reversed for descending order
    },
  },
  {
    headerName: "Created At",
    field: "createdAt",
    sortable: true,
    cellDataType: "date",
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    headerName: "Due Date",
    field: "dueDate",
    sortable: true,
    cellDataType: "date",
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    headerName: "Actions",
    field: "actions",
    sortable: false,
    cellRenderer: ActionCellRenderer,
  },
];

export const rowHeight = 50;
