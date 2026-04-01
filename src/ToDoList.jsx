import React, { useState } from "react";

function ToDoList(){
    const [tasks , setTasks] = useState([]);
    const [newTask , setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }
    function addTask(){
        if (newTask.trim() !== ""){
                    setTasks(t=>[...t,newTask]);
        setNewTask("")
        }
    }
    function deleteTask(index){
        const updatedTasks = tasks.filter((_,i)=> i !== index);
        setTasks(updatedTasks);
    }

    return(
        <div className="to-do-list">
            <h1>To-Do-List</h1>

            <div>
                <input type="text" 
                value={newTask}
                placeholder="Enter Task ..."
                onChange={handleInputChange}
                />

                <button className="add-button"
                onClick={addTask} 
                >
                    add
                </button>

            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ol>

        </div>
    )
}

export default ToDoList