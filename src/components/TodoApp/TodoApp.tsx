import React, { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { Filter } from '../../types/Filter';

export const TodoApp: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);
  const [filterStatus, setFilterStatus] = useState(Filter.ALL);
  const [count, setCount] = useState(0);

  const handleTodoAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim()) {
      setTodos([
        {
          title: todoTitle,
          id: +new Date(),
          completed: false,
        },
        ...todos,
      ]);
    }

    setTodoTitle('');
  };

  const handleCompleteAll = () => {
    const someComepleted = todos.some(todo => !todo.completed);

    if (someComepleted) {
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: true,
      }));

      setTodos(updatedTodos);
    } else {
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: false,
      }));

      setTodos(updatedTodos);
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Filter.COMPLETED:
        return todo.completed;
      case Filter.ACTIVE:
        return !todo.completed;
      default:
        return todo;
    }
  });

  useEffect(() => {
    setCount(todos.filter(todo => !todo.completed).length);
  }, [todos]);

  const handleClearCompletedTodos = () => {
    const activeTodos = [...todos].filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  const isVisibleClearButton = todos.some(todo => todo.completed);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleTodoAdd}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      {!!todos.length
        && (
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleCompleteAll}
              checked={filteredTodos.length !== count}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList todos={filteredTodos} />
          </section>
        )}

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {count === 1
              ? (
                `${count} item left`
              ) : (
                `${count} items left`
              )}
          </span>

          <TodosFilter
            filterStatus={filterStatus}
            onFilterChange={(status: Filter) => setFilterStatus(status)}
          />

          {isVisibleClearButton
            && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompletedTodos}
              >
                Clear completed
              </button>
            )}
        </footer>
      )}
    </div>
  );
};
