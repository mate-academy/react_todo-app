import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, handleCompletedChange, handleRemove }) => {
  return (
    <section className="main">
      <input type="checkbox" id="toggle-all" className="toggle-all" />
      {/* <label htmlFor="toggle-all">Mark all as complete</label> */}

      <ul className="todo-list">
        {todos.map(item => {
          return (
            <TodoItem
              completedChange={handleCompletedChange}
              todo={item}
              key={item.id}
              handleRemove={handleRemove}
            />
          );
        })}
      </ul>
    </section>
  );
};
