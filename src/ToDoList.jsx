import React, { useState, useEffect } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
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

  function handleKeyDown(event) {
    if (event.key === "Enter") {
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
  <div className="book-container">
    <div className="book-spine">
      <div className="spine-detail top"></div>
      <div className="spine-detail bottom"></div>
    </div>
    <div className="book-page">
      <header className="book-header">
        <h1>My Journal</h1>
        <p>Daily Missions & Tasks</p>
      </header>

      <div className="input-section">
        <input
          type="text"
          value={newTask}
          placeholder="What's your next mission?..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="ink-button" onClick={() => addTask(newTask)}>
          Add Task
        </button>
      </div>

      <nav className="book-filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All Entries</button>
        <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Finished</button>
        <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>To-do</button>
      </nav>

      <div className="page-content">
        <table className="journal-table">
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td className="empty-msg">No missions recorded yet...</td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr key={task.id} className="journal-row">
                  <td className="col-status">
                    <div 
                      onClick={() => toggleTasks(task.id)}
                      className={`bullet ${task.completed ? "checked" : ""}`}
                    >
                      {task.completed ? "●" : "○"}
                    </div>
                  </td>
                  <td className={`col-text ${task.completed ? "strikethrough" : ""}`}>
                    {task.text}
                  </td>
                  <td className="col-date">{task.date}</td>
                  <td className="col-action">
                    <button className="del-ink" onClick={() => deleteTask(task.id)}>×</button>
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