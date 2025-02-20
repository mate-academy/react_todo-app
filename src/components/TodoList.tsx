/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

export const TodoList: React.FC = () => {
  const { state, dispatch, inputRef } = useContext(TodoContext);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editedTodo, setEditedTodo] = useState('');

  const handleEditing = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    if (editedTodo.trim() === '') {
      dispatch({ type: 'DELETE_TODO', payload: selectedId as number });
    }

    const todoToEdit: Todo = {
      id: selectedId as number,
      title: editedTodo.trim(),
      completed: false,
    };

    dispatch({ type: 'EDIT_TODO', payload: todoToEdit });
    setSelectedId(null);
  };

  const handleToggle = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
    inputRef.current?.focus();
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === FilterType.Active) {
      return !todo.completed;
    }

    if (state.filter === FilterType.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              onChange={() => handleToggle(todo.id)}
              checked={todo.completed}
            />
          </label>

          {todo.id === selectedId ? (
            <form onSubmit={handleEditing}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editedTodo}
                onChange={event => setEditedTodo(event.target.value)}
                onBlur={handleEditing}
                onKeyUp={event => {
                  if (event.key === 'Escape') {
                    setSelectedId(null);
                  }
                }}
                autoFocus
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  setSelectedId(todo.id);
                  setEditedTodo(todo.title);
                }}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
