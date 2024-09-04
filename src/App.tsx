/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from './types/Todos';
import { Filter } from './types/Filter';
import cn from 'classnames';
import { TodosContext } from './TodoContext/TodoContext';

export const App: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.All);
  const [editTodo, setEditingTodo] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const inputField = useRef<HTMLInputElement>(null);
  const editingField = useRef<HTMLInputElement>(null);
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [todos]);

  useEffect(() => {
    if (editingField.current) {
      editingField.current.focus();
    }
  }, [editTodo]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const inputValue = inputField.current?.value.trim();

    if (!inputValue) {
      return;
    }

    if (inputField.current) {
      inputField.current.value = '';
    }

    if (inputValue) {
      const newTodo: Todo = {
        id: +new Date(),
        title: inputValue,
        userId: 1139,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      case Filter.All:
      default:
        return true;
    }
  });

  const handleDeleteTodo = (todoId: number) => {
    const updateTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updateTodos);
  };

  const updateTodoStatus = (todoId: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleCompletedDelete = () => {
    const notCompletedTodos = todos.filter(todo => !todo.completed);

    setTodos(notCompletedTodos);
  };

  const handleUpdateAll = () => {
    const areSomeIncomplete = todos.some(todo => !todo.completed);

    if (areSomeIncomplete) {
      setTodos(
        todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      );
    } else {
      setTodos(
        todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      );
    }
  };

  const handleRanameTodo = (todoId: number) => {
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
      setEditingTodo(todoId);
      setEditingValue(todo.title);
    }
  };

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  const handleTodoTitleBlur = () => {
    if (editingValue.trim() === '') {
      handleDeleteTodo(editTodo as number);
    } else {
      const updatedTodos = todos.map(todo => {
        if (todo.id === editTodo) {
          return { ...todo, title: editingValue.trim() };
        }

        return todo;
      });

      setTodos(updatedTodos);
    }

    setEditingTodo(null);
    setEditingValue('');
  };

  const handleTodoTitleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setEditingTodo(null);
      setEditingValue('');
    } else if (event.key === 'Enter') {
      handleTodoTitleBlur();
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length !== 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: todos.length > 0 && todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
              onClick={handleUpdateAll}
            />
          )}
          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={inputField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={cn('todo', {
                completed: todo.completed,
              })}
              onDoubleClick={() => handleRanameTodo(todo.id)}
            >
              {editTodo === todo.id ? (
                <>
                  <label
                    className="todo__status-label"
                    htmlFor={`todo-${todo.id}`}
                  >
                    <input
                      id={`todo-${todo.id}`}
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => updateTodoStatus(todo.id)}
                    />
                  </label>
                  <input
                    data-cy="TodoTitleField"
                    className="todo__title-field"
                    ref={editingField}
                    type="text"
                    value={editingValue}
                    placeholder={
                      editingValue.length === 0
                        ? 'Empty todo will be deleted'
                        : ''
                    }
                    onChange={handleEditTitle}
                    onBlur={handleTodoTitleBlur}
                    onKeyUp={handleTodoTitleKeyUp}
                  />
                </>
              ) : (
                <>
                  <label
                    className="todo__status-label"
                    htmlFor={`todo-${todo.id}`}
                  >
                    <input
                      id={`todo-${todo.id}`}
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => updateTodoStatus(todo.id)}
                    />
                  </label>
                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    ×
                  </button>
                </>
              )}
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              {Object.values(Filter).map(status => (
                <a
                  key={status}
                  href={`#/${status}`}
                  className={cn('filter__link', {
                    selected: status === filterStatus,
                  })}
                  data-cy={`FilterLink${status}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </a>
              ))}
            </nav>

            {/* this button should be disabled if there are no completed todos */}

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos.some(todo => todo.completed)}
              onClick={handleCompletedDelete}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
