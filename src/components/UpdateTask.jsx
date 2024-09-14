import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateTask = () => {
  const [id, setId] = useState(0)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();
  useEffect(() => {
    setId(localStorage.getItem("id"));
    setTitle(localStorage.getItem("title"))
    setDescription(localStorage.getItem("description"))
    setDueDate(localStorage.getItem("date"))
    setPriority(localStorage.getItem("priority"))
    setStatus(localStorage.getItem("status"))
  }, [])


  const handleUpdate = (e) => {
    e.preventDefault();
    const newTask = { id, title, description, dueDate, priority, status };
    axios.put(`https://66e4172cd2405277ed130772.mockapi.io/interns/Intern_Project/${id}`, {
      newTask
    })
      .then(() => {
        navigate('/list');
      })
    // console.log(response);
    // Clear the form
    setTitle(" ");
    setDescription(" ");
    setDueDate(" ");
    setPriority(" ");
    setStatus(" ");
  };


  return (
    <div className='w-full h-screen bg-slate-500 flex items-center'>
      <form className="w-[40%] mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-700 font-medium mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button onClick={handleUpdate}
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default UpdateTask
