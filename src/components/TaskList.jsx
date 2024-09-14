import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [task, setTask] = useState([]);
  const [searchTask,setSearchTask] = useState('');
  const[filerTask,setFilterTask] = useState([]);

  // add the item
  const showTaskList = () => {
    axios.get('https://66e4172cd2405277ed130772.mockapi.io/interns/Intern_Project')
      .then((res) => setTask(res.data));
  }

  // delete the item data
  const deleteTask = (id) => {
    axios.delete(`https://66e4172cd2405277ed130772.mockapi.io/interns/Intern_Project/${id}`)
      .then(() => showTaskList());
  }

  const setLocalStorage = (id, title, description, date, priority, status) => {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("date", date);
    localStorage.setItem("priority", priority);
    localStorage.setItem("status", status);
  }
 

  useEffect(() => {
    showTaskList();
  }, []);

  useEffect(()=>{
   const filterData = task.filter((item)=>(
    item.newTask.title.toLowerCase().includes(searchTask.toLowerCase())
   ))
   setFilterTask(filterData);
  },[task,searchTask])
  return (
    <div className="task w-full lg:h-[130vh] sm:h-[230vh] bg-gray-300  sm:p-8 lg:p-4">
      <div className='w-[100%] h-[2%] flex justify-center'>
        <Link to='/'> <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded'>Add New Task</button></Link>
      </div>
      <div className='w-[100%] h-[5%] mt-8 flex justify-center gap-4'>
      <input
            type="text"
            id="title"
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
            className="w-[40%] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button className='bg-red-500  hover:bg-red-700 text-white px-4 rounded'>Search</button>
      </div>
      <div className='w-[100%] h-[93%]  flex lg:flex-row sm:flex-col gap-6 flex-wrap'> 
        {filerTask.map((task, id) => (
          <div key={id} className="bg-white shadow-lg rounded-lg p-6 lg:w-[30%] lg:h-[35%] sm:w-[80%] sm:h-[20%] lg:mt-10 sm:mt-6">
            <h1 className="text-xl font-bold mb-4 text-center text-gray-800 uppercase">{task.newTask.title}</h1>
            <p className="text-gray-600  font-serif bg-slate-200 p-1 mb-2 rounded w-[100%] h-[44%]">
              {task.newTask.description}
            </p>
            <div className='w-[100%] flex justify-between'>
              <p className='text-gray-600 text-center font-serif '> {task.newTask.dueDate}</p>
              <p className='text-gray-600 text-center font-serif '>{task.newTask.priority}</p>
              <p className='text-gray-600 text-center font-serif '>{task.newTask.status}</p>
            </div>
            <div className='w-[100%] flex justify-between mt-4'>
              <Link to="/update"><button onClick={() => setLocalStorage(task.id, task.newTask.title, task.newTask.description, task.newTask.dueDate, task.newTask.priority, task.newTask.status)} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded'>Edit</button></Link>
              <button onClick={() => deleteTask(task.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
