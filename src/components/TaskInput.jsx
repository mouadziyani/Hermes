function TaskInput({ value, onChange, onKeyDown, onAdd }) {
  return (
    <div className="input-section">
      <input
        type="text"
        value={value}
        placeholder="What's your next mission?..."
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button className="ink-button" onClick={onAdd}>
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
