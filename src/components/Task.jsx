// Task.js
import React from 'react';
import { MdDelete } from "react-icons/md";

const Task = ({ task, onDelete, onDragStart }) => {
  return (
    <div
      className="flex flex-row justify-between w-full px-2 pt-5 pb-2 hover:border border-green-900 rounded"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <p>{task.title}</p>
      <MdDelete className="cursor-pointer" onClick={onDelete}/>
    </div>
  );
};

export default Task;



