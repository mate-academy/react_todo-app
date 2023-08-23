import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { useTodo } from './TodosContext';

export const TodoApp: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    todos,
    addTodo,
    toogleAll,
    deleteComplitedTodo,
  } = useTodo();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (newTodoTitle.trim()) {
        addTodo(newTodoTitle);
        setNewTodoTitle('');
        setShowError(false);
      } else {
        setShowError(true);
        setErrorMessage('Todo title cannot be empty.');
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      }
    }
  };

  const toggleAllCheck = todos.every(todo => todo.completed);

  const todosUncomplited = todos.filter(
    todo => !todo.completed,
  ).length;

  const someTodoIsComplited = todos.some(todo => todo.completed);

  const todosNotEmpty = todos.length > 0;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          {showError && <div className="error">{errorMessage}</div>}
        </form>
      </header>

      <section className="main">
        {todosNotEmpty && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={toggleAllCheck}
              onChange={toogleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        {todosNotEmpty && (
          <TodoList
            items={todos}
            selectedFilter={selectedFilter}
          />
        )}
      </section>

      {todosNotEmpty && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {todosUncomplited === 1 ? (
              '1 item left'
            ) : (
              `${todosUncomplited} items left`
            )}
          </span>

          <TodosFilter
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />

          {someTodoIsComplited && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteComplitedTodo}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
