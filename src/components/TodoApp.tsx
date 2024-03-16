import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';
import { TodoList } from './TodoList';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.ALL);

  const todosUncompleteLength = todos.filter(todo => !todo.completed).length;
  const todosCompletedAtLeastOne = todos.some(todo => todo.completed === true);

  const handleChangeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleDeleteCompleted = () => {
    setTodos(currentTodos =>
      currentTodos.filter(todo => todo.completed === false),
    );
  };

  const todosCompletedAll = todos.every(todo => todo.completed === true);

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.ALL) {
      return true;
    }

    if (filter === Filter.ACTIVE) {
      return !todo.completed;
    }

    return todo.completed;
  });

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [newTodo, ...currentTodos]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length !== 0) {
      addTodo({
        id: +new Date(),
        title,
        completed: false,
      });
      setTitle('');
    }
  };

  const handleToggleAll = () => {
    let updatesTodos = [...todos];

    if (updatesTodos.some(todo => todo.completed === false)) {
      updatesTodos = updatesTodos.map(todo => ({
        ...todo,
        completed: true,
      }));

      setTodos(updatesTodos);
    } else {
      updatesTodos = updatesTodos.map(todo => ({
        ...todo,
        completed: false,
      }));

      setTodos(updatesTodos);
    }
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit} onBlur={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitle}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleToggleAll}
            checked={todosCompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList todos={filteredTodos} />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {todosUncompleteLength} items left
          </span>

          <TodosFilter filter={filter} onChange={handleChangeFilter} />

          {todosCompletedAtLeastOne && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleDeleteCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
