/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoItem } from './components/TodoItem';
import { DispatchContext, TodosContext } from './state/State';

export const App: React.FC = () => {
  const [value, setValue] = useState('');
  const { todos } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'addTodo', payload: value });
    setValue('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleOnSubmit}>
          <input
            value={value}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={event => setValue(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list" data-cy="todoList">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}

          {/* <li>
            <div className="view">
              <input type="checkbox" className="toggle" id="toggle-view" />
              <label htmlFor="toggle-view">asdfghj</label>
              <button type="button" className="destroy" data-cy="deleteTodo" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="completed">
            <div className="view">
              <input type="checkbox" className="toggle" id="toggle-completed" />
              <label htmlFor="toggle-completed">qwertyuio</label>
              <button type="button" className="destroy" data-cy="deleteTodo" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="editing">
            <div className="view">
              <input type="checkbox" className="toggle" id="toggle-editing" />
              <label htmlFor="toggle-editing">zxcvbnm</label>
              <button type="button" className="destroy" data-cy="deleteTodo" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li>
            <div className="view">
              <input type="checkbox" className="toggle" id="toggle-view2" />
              <label htmlFor="toggle-view2">1234567890</label>
              <button type="button" className="destroy" data-cy="deleteTodo" />
            </div>
            <input type="text" className="edit" />
          </li> */}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          3 items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
