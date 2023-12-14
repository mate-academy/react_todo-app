import { useState, useMemo } from 'react';
import { Status } from '../types/Status';
import { useTodos } from '../utils/TodoContext';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp = () => {
  const { todos, updateTodo, deleteTodo } = useTodos();
  const [todoStatus, setTodoStatus] = useState<Status>(Status.ALL);

  const preparedTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (todoStatus) {
        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLETED:
          return todo.completed;

        case Status.ALL:
        default:
          return true;
      }
    });
  }, [todoStatus, todos]);

  const allActive = todos.every(t => t.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const handleCompleteAll = () => {
    const isSomeActive = todos.some(todo => !todo.completed);

    if (isSomeActive) {
      activeTodos.forEach(todo => {
        const updatedTodo = { ...todo, completed: true };

        updateTodo(updatedTodo);
      });
    } else {
      todos.forEach(todo => {
        const updatedTodo = { ...todo, completed: false };

        updateTodo(updatedTodo);
      });
    }
  };

  const handleClear = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      deleteTodo(todo.id);
    });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm />
      </header>

      <section className="main">
        {!!todos.length && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={allActive}
              onChange={handleCompleteAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList items={preparedTodos} />
      </section>

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodos.length} items left`}
          </span>

          <TodosFilter
            todoStatus={todoStatus}
            setTodoStatus={setTodoStatus}
          />

          {!!todos.filter(todo => todo.completed).length && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClear}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
