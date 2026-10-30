/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import classNames from 'classnames';
import { Filter } from './types/Filter';
import { useDispatch, useGlobalTodos } from './context/TodoContext';

const filterOptions: {
  value: Filter;
  label: string;
  href: string;
  dataCy: string;
}[] = [
  { value: Filter.all, label: 'All', href: '#/', dataCy: 'FilterLinkAll' },
  {
    value: Filter.active,
    label: 'Active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    value: Filter.completed,
    label: 'Completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const App: React.FC = () => {
  const todos = useGlobalTodos();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.active) {
      return !todo.completed;
    }

    if (filter === Filter.completed) {
      return todo.completed;
    }

    return true;
  });

  const handleDeleteTodo = (todoId: number) => {
    dispatch({ type: 'deleteTodo', payload: todoId });
    inputRef.current?.focus();
  };

  const handleDeleteCompletedTodo = () => {
    dispatch({ type: 'deleteCompletedTodos' });
    inputRef.current?.focus();
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = todoTitle.trim();

    if (!title) {
      return;
    }

    const todoData = {
      id: +new Date(),
      title,
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: todoData });
    setTodoTitle('');
    inputRef.current?.focus();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleUpdateTodo = (todo: Todo) => {
    dispatch({ type: 'updateTodo', payload: todo });
    inputRef.current?.focus();
  };

  const isAllTodosCompleted =
    todos.every(todo => todo.completed) && todos.length > 0;
  const isCompletedTodos = todos.some(todo => todo.completed);
  const todosCounter = todos.filter(todo => !todo.completed).length;

  const handleClickToggleButton = () => {
    dispatch({ type: 'toggleTodos' });
    inputRef.current?.focus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isAllTodosCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleClickToggleButton}
            />
          )}

          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={inputRef}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={handleInputChange}
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && (
          <TodoList
            todos={filteredTodos}
            onTodoDelete={handleDeleteTodo}
            onTodoUpdate={handleUpdateTodo}
          />
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosCounter} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {filterOptions.map(option => (
                <a
                  href={option.href}
                  className={classNames('filter__link', {
                    selected: filter === option.value,
                  })}
                  data-cy={option.dataCy}
                  onClick={() => setFilter(option.value)}
                  key={option.value}
                >
                  {option.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!isCompletedTodos}
              onClick={handleDeleteCompletedTodo}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
