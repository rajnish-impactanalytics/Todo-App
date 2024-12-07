# A Todo App

This README outlines the completed features, design decisions, and additional functionality of the Todo Application.

## Live Demo
[TickIt](https://tickit-v1.netlify.app/)

## Key Features & Enhancements

This todo-application helps you to keep track of your tasks that you want to complete on any given day/time. The application provides a robust, user-friendly interface for managing tasks with various enhancements to improve usability, accessibility, and maintainability. Below are the core features along with some additional functionality I’ve integrated to enhance the user experience.

## Features Implemented

1. **Task Management**

   - **Add Task**: The application allows users to add a new task by clicking the “+ Add Task” button from header. A modal opens where users can input the task summary, description, priority, and due date.
   - **Edit Task**: Users can edit any existing task by clicking the “Edit” icon next to it. The modal will pre-fill the existing details, allowing users to make updates and save.
   - **Delete Task**: Tasks can be deleted by clicking the “Delete” icon. A confirmation modal ensures that the user intends to delete the task before proceeding.
   - **Mark Task as Done**: Clicking the “Done” button moves the task to the “Completed” tab and applies a visual style change (green background in "Completed" & "All" tab).
   - **Reopen Task**: Clicking the “Reopen” button(instead of mark as done in action column) in the “Completed/All” tab moves the task back to “Todo” tab.

2. **Task List Management**

   - **Tabs for Task Status**: Three tabs are available—“Todo,” “Completed,” and “All”—with tasks displayed according to their current state. Tasks are dynamically filtered based on the selected tab.
   - **Global Search**: A search box allows users to filter tasks based on any part of the task summary or description. The search is case-insensitive and highlights matching text and can be opened via keyboard shortcut Ctrl/Cmd+Shift+F.
   - **Sorting**: : Columns such as "Title," "Priority," "Created On," and "Due Date" are sortable. Clicking on a column header alternates between ascending, descending and None sorting order.
   - **Group By**: This feature does not completly resembles with the instruction. Though, tasks can be grouped based on attributes such as “Created On,” “Priority,” or “Due Date” by clicking on their column headers itself. This allows users to view tasks in a more organized manner.

3. **Task Priority and Due Date**

   - **Priority Levels**: Tasks can be assigned one of four priority levels: Low, Medium, High, or None. The “Priority” field is available both when creating and editing a task.
   - **Due Date**: The user can set a due date and time for each task. Tasks that have passed their due date are visually highlighted in red to indicate they are overdue.

4. **UI Enhancements**

   - **Keyboard Shortcuts**: A global keyboard shortcut (Shift + Ctrl + F) focuses the user on the global search input field, improving accessibility and navigation speed.
   - **Visual Indicators for Overdue Tasks**: Tasks with overdue due dates are displayed in red, drawing attention to critical tasks that need to be addressed immediately.

5. **State Management with Redux**
   - The application uses Redux for state management, ensuring a scalable and maintainable architecture.
   - **Asynchronous Task Handling**: CRUD operations (add, edit, delete, mark as done/reopen) are simulated asynchronously using redux-thunk, with setTimeout mimicking API delays.

## Additional Functionality Implemented

1.  **Generic Keyboard Shortcut Feature**
    To enhance the user experience, I’ve implemented a generic keyboard shortcut feature that can be reused across the entire application very smoothly. Users can now define and manage multiple shortcuts for common actions, such as:

- **Search** (Ctrl/Cmd+Shift+F): Trigger search focus using a customizable shortcut.
- **Create Task** (Ctrl/Cmd+Shift+C): Press a shortcut to open the task creation modal.
- **Toggle Grid Color by Priority** (Ctrl/Cmd+Shift+F): Change the background color of the task grid based on priority (Low, Medium, High).

  The shortcuts are designed to be platform-agnostic, adapting automatically to Mac and Windows PC environments. For instance:

  - On Windows, the shortcut for focusing the search input is Ctrl + Shift + F.
  - On Mac, the shortcut automatically adapts to Cmd + +Shift + F.

  These shortcuts are also visible as icon on hover of corresponding action buttons.

2.  **Task Sorting and Filtering Enhancements**
    - **New Task Priority Sorting**: Tasks are sorted by creation time by default, with the most recently created task appearing at the top of the list.
    - **Overdue Task Highlighting**: Tasks that have missed their due date are visually distinguished in red, providing a clear visual cue for tasks that require immediate attention.

## Design Decisions and Technology Stack

1.  **Modularity and Reusability**
    The app is structured to ensure high modularity. Components such as task rows, modals, search bars, and group dropdowns are reusable across the UI. This modular approach makes it easier to scale and maintain the application.
2.  State Management with Redux
    - I chose Redux to manage the application’s state, which allows for centralized state management and ensures consistent behavior across components.
    - Redux-thunk middleware is used to handle asynchronous operations, simulating the delay of API calls for creating, editing, and deleting tasks.
3.  Ag-Grid Library
    I chose ag-Grid for the task list table due to its robust features like advanced sorting, filtering, and grouping, as well as high performance with large datasets. It offers flexibility in customization and ensures a smooth user experience with responsive design and efficient rendering.

4.  Lodash
    Lodash is used to simplify data manipulation and enhance performance. It provides optimized utility functions like _.sortBy(), _.debounce(), and \_.groupBy(), making tasks like sorting, filtering, and deep cloning faster and more efficient.

5.  Material-UI (MUI)
    Material-UI (MUI) provides pre-built, customizable UI components that follow Material Design principles, ensuring a modern, consistent, and accessible design. It allows for easy theming and responsiveness across devices, streamlining the UI development process.

Together, these technologies enable a scalable, responsive, and efficient task management app with a polished user interface.

## Future Improvements

While this version of the application fulfills the assignment requirements, there are several potential improvements and features that could be added:

- **Bulk Actions**: Implement bulk actions (e.g., delete, mark as done/pending) for multiple selected tasks.
- **Integration with a Backend**: Currently, tasks are stored in the frontend state. Future versions could integrate with a backend API to persist tasks and handle real-time updates.
- **User Authentication**: Add a user login system to enable personalized task management.

## Conclusion

This Todo Application has been developed with modern best practices in mind, leveraging React, Redux, and asynchronous handling with redux-thunk. The modular design allows for easy future scalability, and various usability features like keyboard shortcuts and overdue task highlights make the app more user-friendly and efficient.

Feel free to explore the code, and I hope you find the additional features and enhancements valuable!
