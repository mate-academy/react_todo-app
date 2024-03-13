/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoList } from './components/Todo/TodoList';
import { TodosContext } from './Store';
import { Status } from './types/Status';
import { TodosFilter } from './components/Todo/TodosFilter';

export const TodoApp: React.FC = () => {
  const { state, dispatch } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');

  const allCompleted = state.todos.every(todo => todo.completed);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const handleToggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL', payload: !allCompleted });
  };

  const notCompletedTodos = state.todos.filter(todo => !todo.completed);
  const completedTodos = state.todos.filter(todo => todo.completed);

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === Status.All) {
      return true;
    }

    return state.filter === Status.Completed ? todo.completed : !todo.completed;
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={handleInputChange}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={allCompleted}
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={filteredTodos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {notCompletedTodos.length} items left
        </span>

        <TodosFilter />

        {completedTodos.length !== 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </div>
  );
};
