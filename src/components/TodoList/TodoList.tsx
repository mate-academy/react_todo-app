import React, { useCallback, useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList:React.FC = () => {
  const {
    filteredTodos, toggled, setTodos,
  } = useContext(TodosContext);

  const completeAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const done = filteredTodos.map((item) => ({
        ...item, completed: event.target.checked,
      }));

      setTodos(done);
    }, [filteredTodos, setTodos],
  );

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={!filteredTodos.find(todo => !todo.completed)}
        onChange={completeAll}
      />
      {filteredTodos.length !== 0
        && <label htmlFor="toggle-all">Mark all as complete</label>}

      {filteredTodos.length !== 0
        && (
          <ul className="todo-list" data-cy="todoList">
            {filteredTodos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} togLeTodo={toggled} />
            ))}
          </ul>
        )}

    </section>
  );
};
