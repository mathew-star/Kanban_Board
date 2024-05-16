import { useState } from 'react'
import './App.css'
import  './index.css'
import Columns from './components/Columns'
import useStore from './store';

function App() {
  const [newTask, setNewTask] = useState('');
  const { columns, addTask, deleteTask } = useStore();
  console.log("App");

  const handleAddTask=(columnId)=>{

  }


  return (
    <>

  <div className=' relative px-20 py-20'>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">


      {
        columns.map((column)=>( 
          <Columns key={column.id} state={column.title} column={column} onAddTask={handleAddTask}  onDeleteTask={(taskId) => deleteTask(column.id, taskId)}
          />
        ))
      }

    </div>
  </div>

    </>
  )
}

export default App
