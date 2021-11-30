export const TodoItem = ({ todo, completedChange, handleRemove }) => {
  return (
    <li
      className={todo.completed ? 'completed' : 'list-item'}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={() => {
            completedChange(todo);
          }}
        />
        <label htmlFor="title">
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            handleRemove(todo);
          }}
        >
          d
        </button>
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
