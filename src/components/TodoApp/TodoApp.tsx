import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocaleStorage } from '../../useLocalStorage';
import { Todo } from '../../todo';
import { TodoAdd } from '../TodoAdd/TodoAdd';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [areTodosChecked, setTodosChecked] = useState(
    todos.every(todo => todo.completed),
  );

  const location = useLocation();
  const pathName = location.pathname;

  const visibleTodos = todos.filter(todo => {
    switch (pathName) {
      case '/completed':
        return todo.completed;

      case '/active':
        return !todo.completed;

      case '/':
      default:
        return todo;
    }
  });

  const completedCount = todos.reduce((prev, cur) => prev + +cur.completed, 0);

  const handleAllCheck = () => {
    let allTodos;

    if (areTodosChecked) {
      setTodosChecked(false);
      allTodos = todos.map(todo => ({ ...todo, completed: false }));
    } else {
      setTodosChecked(true);
      allTodos = todos.map(todo => ({ ...todo, completed: true }));
    }

    setTodos(allTodos);
  };

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
        <label htmlFor="toggle-all">Mark all as complete</label>

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
            {`${todos.length - completedCount} items left`}
          </span>

          <TodoFilter pathName={pathName} />

          {completedCount > 0 && (
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
