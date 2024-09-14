import React from 'react'
import TaskForm from './components/TaskForm'
import { Route, Routes } from 'react-router-dom'
import TaskList from './components/TaskList'
import UpdateTask from './components/UpdateTask'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<TaskForm />} />
        <Route path='/list' element={<TaskList />} />
        <Route path='/update' element={<UpdateTask />} />
      </Routes>
    </div>
  )
}

export default App
