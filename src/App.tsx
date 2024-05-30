/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import {
  DispatchContext,
  Status,
  Todo,
  TodoContext,
  Type,
} from './todoStorage';
import { TodoFilterPanel } from './components/TodosFilterPanel';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [addTodos, setAddTodos] = useState('');
  const { todos, status } = useContext(TodoContext);
  const titleField = useRef<HTMLInputElement>(null);
  const dispatch = useContext(DispatchContext);
  const completedTodo = todos.filter((todo: Todo) => todo.completed);
  const activeTodo = todos.filter((todo: Todo) => !todo.completed);
  const isDisabled = todos.some(todo => todo.completed);

  useEffect(() => {
    if (todos) {
      titleField.current?.focus();
    }
  }, [todos]);

  const handleTasksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodos(event.target.value);
  };

  const handleAddTasks = (event: React.FormEvent) => {
    event.preventDefault();

    if (addTodos.trim() === '') {
      return;
    }

    if (addTodos.length >= 1) {
      dispatch({
        type: Type.Add,
        id: +new Date(),
        title: addTodos.trim(),
      });
      setAddTodos('');
    }
  };

  const toggleAllTodos = () => {
    dispatch({
      type: Type.AllComplete,
    });
  };

  const handleClearAllCompleted = () => {
    completedTodo.forEach((todo: Todo) => {
      dispatch({
        type: Type.Remove,
        id: todo.id,
      });

      dispatch({
        type: Type.setStatus,
        payload: Status.All,
      });
    });
  };

  const filterTodos = (currentTodos: Todo[], filter: string) => {
    if (filter === 'active') {
      return activeTodo;
    } else if (filter === 'completed') {
      return completedTodo;
    } else {
      return currentTodos;
    }
  };

  const filteredTodos = filterTodos(todos, status);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              onClick={toggleAllTodos}
              className={cn('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={handleAddTasks}>
            <input
              ref={titleField}
              value={addTodos}
              onChange={handleTasksChange}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodo.length} items left
              </span>

              <TodoFilterPanel />

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={handleClearAllCompleted}
                disabled={!isDisabled}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};
