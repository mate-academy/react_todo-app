import React, { useContext, useMemo, useState } from 'react';
import { TodosContext } from '../utils/TodoContext';
import { Filter } from '../types/Filter';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodoFilter';

type Props = {
};

export const TodoMainApp: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      setTodos((prevTodos) => [...prevTodos, newTask]);
      setTitle('');
    }
  };

  const handleCompleteAll = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !todos.some(t => t.completed),
    }));

    setTodos(updatedTodos);
  };

  const handleClearCompletes = () => {
    setTodos(currentTodos => currentTodos
      .filter(elem => !elem.completed));
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

  const { noCompleteTodos, isSomeComplete, allCompleted } = useMemo(
    () => ({
      noCompleteTodos: todos.filter((elem) => !elem.completed),
      isSomeComplete: todos.some((todo) => todo.completed),
      allCompleted: todos.every((todo) => todo.completed),
    }),
    [todos],
  );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleAddTodo}
          onBlur={handleAddTodo}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleChangeTitle}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <section className="main">

          <input
            checked={allCompleted}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleCompleteAll}
          />
          {todos.length !== 0 && (
            <label htmlFor="toggle-all">Mark all as complete</label>
          )}

          <TodoList todos={filteredTodos} />

        </section>
      )}

      {todos.length !== 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${noCompleteTodos.length} items left`}
          </span>

          <TodosFilter
            currentFilter={filter}
            onFilterChange={handleFilterChange}
          />

          {isSomeComplete && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearCompletes}
            >
              Clear completed
            </button>
          )}

        </footer>
      )}
    </div>
  );
};
