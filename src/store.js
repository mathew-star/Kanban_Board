// store.js
import create from 'zustand';

const useStore = create((set) => ({
  columns: [
    {
      id: 1,
      title: 'To Do',
      tasks: [{ id: 1, title: 'Task 1' }],
    },
    {
      id: 2,
      title: 'In Progress',
      tasks: [{ id: 2, title: 'Task 2' }],
    },
    {
      id: 3,
      title: 'Done',
      tasks: [{ id: 3, title: 'Task 3' }],
    },
  ],
  addTask: (columnId, task) =>
    set((state) => ({
      columns: state.columns.map((column) =>
        column.id === columnId ? { ...column, tasks: [...column.tasks, task] } : column
      ),
    })),
  deleteTask: (columnId, taskId) =>
    set((state) => ({
      columns: state.columns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
          : column
      ),
    })),
  moveTask: (sourceColumnId, targetColumnId, taskId) =>
    set((state) => {
      const sourceColumn = state.columns.find((column) => column.id === sourceColumnId);
      const targetColumn = state.columns.find((column) => column.id === targetColumnId);
      const taskToMove = sourceColumn.tasks.find((task) => task.id === taskId);
      
      const updatedSourceColumn = {
        ...sourceColumn,
        tasks: sourceColumn.tasks.filter((task) => task.id !== taskId),
      };

      const updatedTargetColumn = {
        ...targetColumn,
        tasks: [...targetColumn.tasks, taskToMove],
      };

      return {
        columns: state.columns.map((column) =>
          column.id === sourceColumnId
            ? updatedSourceColumn
            : column.id === targetColumnId
            ? updatedTargetColumn
            : column
        ),
      };
    }),
}));

export default useStore;
