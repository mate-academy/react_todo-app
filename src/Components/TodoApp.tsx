import React, { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { Store } from '../Store/Store';
import { Filter } from '../Types/Filter';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(Store);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() !== '') {
      setTitle(event.target.value);
    } else if (title.trim() !== '') {
      setTitle(event.target.value);
    }
  };

  const handlerAddTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() !== '') {
      const newTask = {
        id: +new Date(),
        title,
        completed: false,
      };

      setTodos(prev => [...prev, newTask]);
      setTitle('');
    }
  };

  const handlerClearCompletes = () => {
    setTodos(currentTodos => currentTodos.filter(elem => !elem.completed));
  };

  const handlerFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handlerCompleteAll = () => {
    if (todos.some(todo => todo.completed === false)) {
      const updateTodos = todos.map(todo => ({
        ...todo,
        completed: true,
      }));

      setTodos(updateTodos);
    } else {
      const updateTodos = todos.map(todo => ({
        ...todo,
        completed: false,
      }));

      setTodos(updateTodos);
    }
  };

  const noComplete = todos.filter(elem => !elem.completed);
  const isSomeComplet = todos.some(elem => elem.completed === true);
  const allCompleted = todos.every(elem => elem.completed === true);

  const filterTodos = todos.filter(todo => {
    if (filter === Filter.ALL) {
      return true;
    }

    if (filter === Filter.ACTIVE) {
      return !todo.completed;
    }

    return todo.completed;
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handlerAddTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={changeTitle}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={allCompleted}
            onChange={handlerCompleteAll}
          />
          {todos.length !== 0 && (
            <label htmlFor="toggle-all">Mark all as complete</label>
          )}

          <TodoList items={filterTodos} />
        </section>
      )}

      {todos.length !== 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${noComplete.length} items left`}
          </span>
          <TodosFilter
            currentFilter={filter}
            onFilterChange={handlerFilterChange}
          />

          {isSomeComplet && (
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
