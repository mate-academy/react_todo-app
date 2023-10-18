import React, { useState, useContext } from 'react';

import { TodosContext } from '../context';
import { TodoFilter } from '../TodoFilter';
import { TodoList } from '../TodoList';
import { Filter } from '../../types/Filter';

type Props = {
};

export const TodoApp: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim()) {
      const newTask = {
        id: +new Date(),
        title,
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTask]);
      setTitle('');
    }
  };

  const handleCompleteAll = () => {
    if (todos.some(todo => !todo.completed)) {
      const updatedTodos = todos.map((todo) => ({
        ...todo,
        completed: true,
      }));

      setTodos(updatedTodos);
    } else {
      const updatedTodos = todos.map((todo) => ({
        ...todo,
        completed: false,
      }));

      setTodos(updatedTodos);
    }
  };

  const handleClearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(elem => !elem.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filter.ALL) {
      return true;
    }

    if (filter === Filter.ACTIVE) {
      return !todo.completed;
    }

    return todo.completed;
  });

  const noCompletedTodos = todos.filter(elem => !elem.completed);
  const someCompleted = todos.some(todo => todo.completed);
  const allCompleted = todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>

        <form onSubmit={handleAddTodo} onBlur={handleAddTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitleChange}
          />
        </form>
      </header>

      {todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              checked={allCompleted}
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleCompleteAll}
            />
            {todos.length !== 0 && (
              <label htmlFor="toggle-all">
                Mark all as complete
              </label>
            )}

            <TodoList todos={filteredTodos} />

          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${noCompletedTodos.length} items left`}
            </span>

            <TodoFilter
              currentFilter={filter}
              onFilterChange={handleFilterChange}
            />

            {someCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
