// Columns.js
import React, { useState } from 'react';
import { VscAdd } from "react-icons/vsc";
import useStore from '../store';
import Task from './Task';

function Columns({ state, column }) {
  const board = state;
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { addTask, deleteTask, moveTask } = useStore();

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const task = { id: Date.now(), title: newTask };
      addTask(column.id, task);
      setNewTask('');
      setShowInput(false);
    }
  };

  const handleCancel = () => {
    setShowInput(false);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumnId', column.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const sourceColumnId = parseInt(e.dataTransfer.getData('sourceColumnId'));
    moveTask(sourceColumnId, targetColumnId, taskId);
  };

  return (
    <div
      className="h-[50vh] animate-border inline-block rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1 transition-all duration-300"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, column.id)}
    >
      <div className="flex flex-row justify-between rounded-md bg-slate-900 px-5 py-3 font-bold text-white">
        <p>{board}</p>
        <VscAdd className='cursor-pointer' onClick={() => setShowInput(true)} />
      </div>
      <div className="mt-3 h-[86%] block rounded-md bg-slate-900 px-5 py-3 font-bold text-white">
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={() => deleteTask(column.id, task.id)}
            onDragStart={(e) => handleDragStart(e, task.id)}
          />
        ))}
        {showInput && (
          <div className="px-1 py-2">
            <input
              className='bg-slate-900 border-b-2 border-b-gray-400 px-2'
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task"
            />
            <button className='me-3 mt-2' onClick={handleCancel}>Cancel</button>
            <button className='mt-2' onClick={handleAddTask}>Add Task</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Columns;
