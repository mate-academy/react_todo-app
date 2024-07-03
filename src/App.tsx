/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useReducer } from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { AddTodo } from './components/AddTodo';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { getLocalStorageData } from './services/getLocalStorageData';
import { Filter } from './types/Filter';

type Action =
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: number }
  | { type: 'update'; payload: Todo }
  | { type: 'filterList'; payload: Filter }
  | { type: 'setAllComplete'; payload: boolean }
  | { type: 'clearAll' };

function reducer(todos: Todo[], action: Action) {
  let newTodos: Todo[] = [];

  switch (action.type) {
    case 'add':
      newTodos = [
        ...todos,
        { id: +new Date(), title: action.payload.trim(), completed: false },
      ];
      break;

    case 'delete':
      newTodos = todos.filter(t => t.id !== action.payload);
      break;

    case 'update':
      newTodos = todos.map(t =>
        t.id === action.payload.id ? action.payload : t,
      );
      break;

    case 'filterList':
      newTodos = todos.map(t => ({ ...t, filter: action.payload }));
      break;

    case 'setAllComplete':
      newTodos = todos.map(t => ({ ...t, completed: action.payload }));
      break;

    case 'clearAll':
      newTodos = todos.filter(t => !t.completed);
      break;

    default:
      return todos;
  }

  localStorage.setItem('todos', JSON.stringify(newTodos));

  return newTodos;
}

export const App: React.FC = () => {
  const initialTodos: Todo[] = getLocalStorageData('todos', []);
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleAddTodo = (text: string) => {
    dispatch({ type: 'add', payload: text });
  };

  const handleDeleteTodo = (todoId: number) => {
    dispatch({ type: 'delete', payload: todoId });
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    dispatch({ type: 'update', payload: updatedTodo });
  };

  const isAllCompleted = todos.every(t => t.completed === true);

  const handleToggleAll = () => {
    dispatch({ type: 'setAllComplete', payload: !isAllCompleted });
  };

  const handleFilter = (filter: Filter) => {
    dispatch({ type: 'filterList', payload: filter });
  };

  const handleClearCompleted = (type: 'clearAll') => {
    dispatch({ type: type });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              ['active']: isAllCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
          />

          {/* Add a todo on form submit */}
          <AddTodo onAddTodo={handleAddTodo} />
        </header>

        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            onFilterTodos={handleFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>
    </div>
  );
};
