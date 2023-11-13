/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodosContext } from './components/TodosContext';
import { TodosFilter } from './components/TodosFilter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');

  const addTodo = (value: string) => {
    const newTodo:Todo = {
      id: +new Date(),
      title: value,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      return;
    }

    addTodo(newTitle);
    setNewTitle('');
  };

  const toggleAll = () => {
    const areAllTodosCompleted = todos.every(todo => todo.completed);
    const updatedTodos
      = todos.map(todo => ({ ...todo, completed: !areAllTodosCompleted }));

    setTodos(updatedTodos);
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => toggleAll()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />

      </section>

      {todos.length > 0
        && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {activeTodoCount === 1
                ? ('1 item left')
                : (`${activeTodoCount} items left`)}
            </span>

            <TodosFilter />

            {hasCompletedTodos && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => deleteCompletedTodos()}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
    </div>
  );
};
