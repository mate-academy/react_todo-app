/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

export const TodoList: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editedTodo, setEditedTodo] = useState('');

  const handleEditing = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todoToEdit: Todo = {
      id: selectedId as number,
      title: editedTodo,
      completed: false,
    };

    dispatch({ type: 'EDIT_TODO', payload: todoToEdit });
    setSelectedId(null);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {state.todos.map(todo => (
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
              // checked={todo.completed}
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
                autoFocus
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onClick={() => {
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
