import React, { useContext, useState } from 'react';

import { TodosContext } from '../TodosContext';
import { TodoList } from '../components/TodoList/TodoList';
import { TodosFilter } from '../components/TodosFilter/TodosFilter';
import { Filter } from '../types/Filter';

type Props = {
};

export const TodoApp: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);

  const handlerFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handlerChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlerAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() !== '') {
      const newTask = {
        id: +new Date(),
        title,
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, newTask]);
      setTitle('');
    }
  };

  const handlerCompleteAll = () => {
    if (todos.some(todo => todo.completed === false)) {
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

  const handlerClearCompletes = () => {
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

  const noCompleteTodos = todos.filter(elem => !elem.completed);
  const isSomeComplete = todos.some(todo => todo.completed === true);
  const allCompleted = todos.every(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handlerAddTodo}
          onBlur={handlerAddTodo}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handlerChangeTitle}
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
            onChange={handlerCompleteAll}
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
            onFilterChange={handlerFilterChange}
          />

          {isSomeComplete && (
            <button
              type="button"
              className="clear-completed"
              onClick={handlerClearCompletes}
            >
              Clear completed
            </button>
          )}

        </footer>
      )}
    </div>
  );
};
