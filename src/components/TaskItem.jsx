function TaskItem({ task, onToggle, onDelete }) {
  return (
    <tr className="journal-row">
      <td className="col-status">
        <div
          onClick={() => onToggle(task.id)}
          className={`bullet ${task.completed ? "checked" : ""}`}
        >
          {task.completed ? "X" : "O"}
        </div>
      </td>
      <td className={`col-text ${task.completed ? "strikethrough" : ""}`}>
        {task.text}
      </td>
      <td className="col-date">{task.date}</td>
      <td className="col-action">
        <button className="del-ink" onClick={() => onDelete(task.id)}>
          x
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
