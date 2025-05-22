import React, { useState, useEffect } from 'react'
import axios from 'axios'

function TodoPage() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [taskInput, setTaskInput] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos')
    setTasks(response.data)
  }

  const addTask = async () => {
    if (taskInput.trim()) {
      const response = await axios.post('http://localhost:5000/todos', {
        text: taskInput.trim(),
      })
      setTasks([...tasks, response.data])
      setTaskInput('')
    }
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks =
    filter === 'all'
      ? tasks
      : tasks.filter((task) => (filter === 'completed' ? task.completed : !task.completed))

  return (
    <div className="main-content" id="todo-page">
      <h1>My TODO List</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filter-buttons">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        onClick={async () => {
          try {
            console.log('Sending request to /summarize...');
            const response = await axios.post('http://localhost:5000/summarize');
            console.log('Response from /summarize:', response.data);
            alert('Summary sent to Slack!');
          } catch (error) {
            console.error('Error summarizing tasks:', error.response || error.message);
            if (error.response) {
              alert(`Failed to send summary: ${error.response.data.error}`);
            } else {
              alert('Failed to send summary. Check the console for details.');
            }
          }
        }}
      >
        Summarize Tasks
      </button>
    </div>
  )
}

export default TodoPage