/* eslint-disable jsx-a11y/control-has-associated-label */

import { useContext, useState } from 'react';
import { Status, Todo } from '../../types/TodoApp';
import { TodoList } from '../TodoList';
import { DispatchContext, StateContext } from '../../Context/TodosContext';
import { TodosFilter } from '../TodosFilter';

export const TodoApp: React.FC = () => {
  const { todos, status } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [newTodo, setNewTodo] = useState('');

  const notCompletedTodos = todos.filter(item => !item.completed).length;
  const isToggleAllActive = todos.every(item => item.completed);
  const isTodos = !!todos.length;
  const showClearCompleted = todos.some(item => item.completed) && isTodos;

  let visibleTodos = todos;

  switch (status) {
    case Status.Active:
      visibleTodos = todos.filter((item: Todo) => !item.completed);
      break;

    case Status.Completed:
      visibleTodos = todos.filter((item: Todo) => item.completed);
      break;

    default:
      break;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTodo.trim() === '') {
      return;
    }

    const addTodo: Todo = {
      id: +new Date(),
      title: newTodo,
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: addTodo });
    setNewTodo('');
  };

  const handleToggleAll = () => {
    dispatch({ type: 'toggleStatusAll' });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'clearCompletedTodos' });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="new-todo"
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={handleChange}
          />
        </form>
      </header>

      {isTodos && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isToggleAllActive}
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={visibleTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {notCompletedTodos} items left
            </span>

            <TodosFilter />

            {showClearCompleted && (
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
