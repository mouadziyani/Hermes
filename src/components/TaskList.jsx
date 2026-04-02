import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="page-content">
      <table className="journal-table">
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td className="empty-msg">No missions recorded yet...</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
