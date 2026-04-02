function Filter({ filter, onChange }) {
  return (
    <nav className="book-filters">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        All Entries
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => onChange("completed")}
      >
        Finished
      </button>
      <button
        className={filter === "pending" ? "active" : ""}
        onClick={() => onChange("pending")}
      >
        To-do
      </button>
    </nav>
  );
}

export default Filter;
