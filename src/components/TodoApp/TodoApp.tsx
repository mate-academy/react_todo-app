import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TodoList } from '../TodoList';
import { useLocaleStorage } from '../../useLocalStorage';
import { Todo } from '../../Types/Todo';
import { TodoAdd } from '../TodoAdd/TodoAdd';
import { TodoFilter } from '../TodoFilter';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [areTodosChecked, setTodosChecked] = useState(
    todos.every(todo => todo.completed),
  );

  const currentPath = useLocation().pathname;

  const visibleTodos = todos.filter(todo => {
    switch (currentPath) {
      case '/completed':
        return todo.completed;

      case '/active':
        return !todo.completed;

      default:
        return todo;
    }
  });

  const handleAllCheck = () => {
    let allTodos = [...todos];

    if (areTodosChecked) {
      setTodosChecked(false);
      allTodos = todos.map(todo => ({ ...todo, completed: false }));
    } else {
      setTodosChecked(true);
      allTodos = todos.map(todo => ({ ...todo, completed: true }));
    }

    setTodos(allTodos);
  };

  const amoutOfCompleted
    = todos.reduce((prev, cur) => prev + +cur.completed, 0);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoAdd todos={todos} onSetTodos={setTodos} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={handleAllCheck}
          checked={areTodosChecked}
        />

        {todos.length > 0 && (
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
        )}

        <TodoList
          todos={todos}
          visibleTodos={visibleTodos}
          onSetTodos={setTodos}
          onCheckTodos={setTodosChecked}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.length - amoutOfCompleted} items left`}
          </span>

          <TodoFilter currentPath={currentPath} />

          {amoutOfCompleted > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => (
                setTodos(todos.filter(todo => !todo.completed))
              )}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
