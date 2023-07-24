import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import { TodoItem } from '../TodoItem';

const TodoList = () => {
  const { visibleTodos, todos, completeAll } = useContext(TodoContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        checked={todos.every(t => t.completed)}
        onChange={completeAll}
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
};

export const TodoMain = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      { todos.length > 0 && <TodoList />}
    </>
  );
};
