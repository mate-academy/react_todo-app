import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocaleStorage } from '../../customHooks/useLocaleStorage';
import { Todo } from '../../types/Todo';
import { TodoAdd } from '../TodoAdd/TodoAdd';
import { TodoFilter } from '../TodoFilter/TodoFIlter';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp = () => {
  const [
    todosFromStorage,
    setTodosFromStorage,
  ] = useLocaleStorage<Todo[]>('todos', []);
  const [areTodosChecked, setTodosChecked] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    setVisibleTodos(todosFromStorage.filter(todo => {
      switch (pathName) {
        case '/completed':
          return todo.completed;

        case '/active':
          return !todo.completed;

        case '/':
        default:
          return todo;
      }
    }));

    setTodosChecked(todosFromStorage.every(todo => todo.completed));
    setCompletedCount(todosFromStorage
      .reduce((prev, cur) => prev + Number(!cur.completed), 0));
  }, [todosFromStorage, pathName]);

  const handleAllCheck = () => {
    const allTodos = todosFromStorage.map(todo => (
      {
        ...todo,
        completed: !areTodosChecked,
      }));

    if (areTodosChecked) {
      setTodosChecked(false);
    } else {
      setTodosChecked(true);
    }

    setTodosFromStorage(allTodos);
  };

  const removeCompleted = () => {
    setTodosFromStorage(todosFromStorage
      .filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoAdd
          todos={todosFromStorage}
          onSetTodos={setTodosFromStorage}
        />
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
          todos={todosFromStorage}
          visibleTodos={visibleTodos}
          onSetTodos={setTodosFromStorage}
          onCheckTodos={setTodosChecked}
        />

      </section>

      {todosFromStorage.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${completedCount} items left`}
          </span>

          <TodoFilter pathName={pathName} />

          {completedCount < todosFromStorage.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={removeCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
