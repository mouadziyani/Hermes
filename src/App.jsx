import { useState, useEffect } from "react";
import "./ToDoList.css";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import Filter from "./components/Filter.jsx";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) return [];
    const parsed = JSON.parse(savedTasks);
    return parsed.map((task) => ({
      id: task.id,
      title: task.title ?? task.text ?? "",
      completed: Boolean(task.completed),
      created_at: task.created_at ?? task.date ?? "",
    }));
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask(text) {
    if (text.trim() !== "") {
      const taskObj = {
        id: Date.now(),
        title: text,
        completed: false,
        created_at: new Date().toLocaleDateString("fr-FR"),
      };
      setTasks([...tasks, taskObj]);
      setNewTask("");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask(newTask);
    }
  }

  function toggleTask(taskId) {
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

        <TaskInput
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onAdd={() => addTask(newTask)}
        />

        <Filter filter={filter} onChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
