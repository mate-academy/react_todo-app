import { useContext, useCallback } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../TodoContext';

export const TodoList: React.FC = () => {
  const { preparedTodos, setTodos } = useContext(TodoContext);

  const handleAllCompleted = useCallback(() => {
    const allCompleted = preparedTodos.every(todo => todo.completed);

    setTodos(preparedTodos.map(todo => (
      { ...todo, completed: !allCompleted }
    )));
  }, [preparedTodos]);

  return (
    <section className="main">
      {preparedTodos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            value="Mark all as complete"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}
      <ul className="todo-list" data-cy="todoList">
        {preparedTodos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </section>
  );
};
