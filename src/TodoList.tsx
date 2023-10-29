import React, { useState } from 'react';
import { TodoCard } from './TodoCard';
import { Todo } from './types/Todo';
import { useTodo } from './TodoContext';
import { updateTodos } from './api/todos';
import { ErrorStatus } from './types/Error';
import { Loader } from './Loader';

type Props = {
  todos: Todo[],
  visibleTodos: Todo[],
  toggleAll: Todo[],
  untoggleAll: Todo[],
};

export const TodoList: React.FC<Props> = ({
  todos,
  visibleTodos,
  toggleAll,
  untoggleAll,
}) => {
  const {
    setTodos,
    setError,
    tempTodo,
    setTogglingAll,
  } = useTodo();
  const [isChecked, setIsChecked] = useState(false);

  const updateAll = async () => {
    setError(ErrorStatus.none);

    try {
      if (todos.findIndex(todo => todo.completed === false) > -1) {
        setTogglingAll('completed');
        await Promise.all(todos.map(todo => updateTodos(todo.id, true)));

        setTodos(toggleAll);
        setIsChecked(true);
      } else {
        setTogglingAll('active');
        await Promise.all(todos.map(todo => updateTodos(todo.id, false)));

        setTodos(untoggleAll);
        setIsChecked(false);
      }
    } catch {
      setError(ErrorStatus.update);
    } finally {
      setTogglingAll('');
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={isChecked}
        data-cy="toggleAll"
        onClick={updateAll}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul
        className="todo-list"
        data-cy="todoList"
      >
        {visibleTodos.map(todo => (
          <TodoCard
            todos={todos}
            currentTodo={todo}
            key={todo.id}
          />
        ))}

        {tempTodo && (
          <li
            className="last_todo"
            style={{ opacity: '0.5' }}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={String(tempTodo?.id)}
                checked={false}
              />

              <div
                className="text"
              >
                {tempTodo?.title}
              </div>

              <button
                type="button"
                className="destroy"
                aria-label="delete"
                data-cy="deleteTodo"
              />
            </div>

            <div className="loader_container">
              <Loader />
            </div>
          </li>
        )}
      </ul>
    </section>
  );
};
