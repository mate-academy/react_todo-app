import React, { useContext, useState } from 'react';
import { TodosContext } from './TodoContext';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleTodoAdd = (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleCompleteAll = () => {
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

  const handleClearCompletes = () => {
    setTodos(currentTodos => currentTodos.filter(item => !item.completed));
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

  const uncompletedTodos = todos.filter(item => !item.completed);
  const isSomeCompleted = todos.some(item => item.completed === true);
  const completedTodos = todos.every(item => item.completed === true);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleTodoAdd}
          onBlur={handleTodoAdd}
        >
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

      {todos.length !== 0 && (
        <section className="main">
          <input
            checked={completedTodos}
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
            {`${uncompletedTodos.length} items left`}
          </span>

          <TodoFilter
            currentFilter={filter}
            onFilterChange={handleFilterChange}
          />

          {isSomeCompleted && (
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
