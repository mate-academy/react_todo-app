import { TodoItem } from './TodoItem';

export const TodoList = ({
  todos,
  toggleAll,
  handleRemove,
  handleTodoEdit,
  handleCompletedChange,
}) => {
  return (
    <section className="main">
      <label
        htmlFor="toggle-all"
        style={{ cursor: 'pointer' }}
      >
        Mark all as complete
        <input
          type="checkbox"
          id="toggle-all"
          onClick={toggleAll}
          className="toggle-all"
        />
      </label>

      <ul className="todo-list">
        {todos.map(item => {
          return (
            <TodoItem
              completedChange={handleCompletedChange}
              todo={item}
              key={item.id}
              handleRemove={handleRemove}
              handleTodoEdit={handleTodoEdit}
            />
          );
        })}
      </ul>
    </section>
  );
};
