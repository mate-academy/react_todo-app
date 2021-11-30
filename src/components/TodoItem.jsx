export const TodoItem = ({ todo, handleCompletedChange }) => {
  return (
    <li
      className={todo.completed ? 'completed' : 'list-item'}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={handleCompletedChange(todo)}
        />
        <label htmlFor="co">
          {todo.title}
        </label>
        <button type="button" className="destroy">d</button>
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
