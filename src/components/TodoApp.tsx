import React, { useEffect, useState } from 'react';
import { useTodos } from './TodosContext';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';
import { Status } from '../Types/Status';

const TodoApp: React.FC = () => {
  const {
    addTodo, todos, setTodos, clearCompleted,
  } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [toggleAll, setToggleAll] = useState(false);
  const [activeStatus, setActiveStatus] = useState<Status>(Status.All);

  const activeTodos = todos.filter(todo => !todo.completed);

  useEffect(() => {
    const allCompleted = todos.every(todo => todo.completed);

    setToggleAll(allCompleted);
  }, [todos]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      const id = +new Date(); // Unique ID using current timestamp
      const todo = { id, title: newTodo, completed: false };

      addTodo(todo);
      setNewTodo('');
    }
  };

  const handleToggleAll = () => {
    const newToggleAll = !toggleAll;

    setToggleAll(newToggleAll);
    const updatedTodos = todos.map(todo => (
      { ...todo, completed: newToggleAll }
    ));

    setTodos(updatedTodos);
  };

  const handleFilterChange = (status: Status) => {
    setActiveStatus(status);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
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
            checked={toggleAll}
            onChange={handleToggleAll}
            disabled={todos.length === 0}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList todos={todos} activeStatus={activeStatus} />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodos.length} items left`}
          </span>

          <TodosFilter
            activeStatus={activeStatus}
            onFilterChange={handleFilterChange}
          />

          {todos.some(todo => todo.completed) && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};

export default TodoApp;
