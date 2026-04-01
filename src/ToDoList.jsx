import React, { useState } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask(text) {
    if (text.trim() !== "") {
      const TaskObj = {
        id: Date.now(),
        text,
        date: new Date().toLocaleDateString('fr-FR'),
        completed: false,
      };
      setTasks([...tasks, TaskObj]);
      setNewTask("");
    }
  }
  function handleKeyDown(event){
  if(event.key === "Enter"){
    addTask(newTask);
  }
}

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <div className="todo-card">
        <header className="header">
          <h1>Task Manager</h1>
          <p>Manage your productivity efficiently</p>
        </header>

        <div className="input-group">
          <input
            type="text"
            value={newTask}
            placeholder="Add a new mission..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="add-button" onClick={() => addTask(newTask)}>
            Add Task
          </button>
        </div>

        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Task Description</th>
                <th>Created At</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-row">
                    No tasks found. Time to relax!
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr key={task.id} className="table-row">
                    <td>
                      <span className="badge-pending">Pending</span>
                    </td>
                    <td className="task-name">{task.text}</td>
                    <td className="task-date">{task.date}</td>
                    <td className="text-right">
                      <button
                        className="btn-delete"
                        onClick={() => deleteTask(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;