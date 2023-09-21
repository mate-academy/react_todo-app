import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (todoId: number) => void;
  deleteId: number[];
  selectedaTodo: number | null | undefined;
  onSelectedTodo: (id: number | null) => void;
  editTodo: (todoID: number, updatedTodo: Todo) => void;
  checkedTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  deleteId,
  selectedaTodo,
  onSelectedTodo,
  editTodo,
  checkedTodo,
}) => {
  const deleteItem = deleteId.includes(todo.id);
  const [renameTodo, setRenameTodo] = useState<string>(todo.title);

  const handleRenameTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRenameTodo(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (renameTodo !== todo.title && editTodo) {
      editTodo(todo.id, { ...todo, title: renameTodo });
    }

    if (onSelectedTodo) {
      onSelectedTodo(null);
    }
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setRenameTodo(todo.title);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (renameTodo !== todo.title && editTodo) {
      editTodo(todo.id, { ...todo, title: renameTodo });
    }

    if (onSelectedTodo) {
      onSelectedTodo(null);
    }
  };

  return (
    <>
      <form
        className={classNames('todo', {
          completed: todo.completed,
        })}
        key={todo.id}
        onSubmit={handleSubmit}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            onChange={() => checkedTodo(todo)}
          />
        </label>

        {selectedaTodo === todo.id
          ? (
            <input
              type="text"
              className="todo__title-field"
              placeholder="Please edit todo"
              onChange={handleRenameTodo}
              value={renameTodo}
              onKeyUp={handleKey}
              onBlur={handleBlur}
            />
          )
          : (
            <>
              <span
                className="todo__title"
                onDoubleClick={() => onSelectedTodo(todo.id)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                onClick={() => deleteTodo(todo.id)}
              >
                x
              </button>

              <div className={classNames(
                'modal overlay', {
                  'is-active': deleteItem,
                },
              )}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </>
          )}
      </form>
    </>
  );
};
