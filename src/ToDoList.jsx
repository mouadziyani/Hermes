import React, { useState , useEffect } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState(()=> {
      const savedTasks = localStorage.getItem("tasks")
  return savedTasks ? JSON.parse(savedTasks) : [] 
  });
  const [newTask, setNewTask] = useState("")
  const [filter, setFilter] = useState("all");

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

  function toggleTasks(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

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

        <div className="filter-group">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-button ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-button ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
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
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-row">
                    No tasks found. Time to relax!
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="table-row">
                    <td>
                              <span
                                onClick={() => toggleTasks(task.id)}
                                className={`status ${task.completed ? "done" : "pending"}`}
                              >
                                {task.completed ? "Done" : "Pending"}
                              </span>
                            </td>
                    <td className="task-name"
                        style={{
                          textDecoration: task.completed ? "line-through" : "none"
                        }}
                      >
                        {task.text}
                      </td>
                    <td className="task-date">{task.date}</td>
                    <td className="text-right">
                      <button
                        className="btn-delete"
                        onClick={() => deleteTask(task.id)}
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
