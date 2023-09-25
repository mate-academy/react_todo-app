import React, { useState, useEffect, useRef } from 'react';
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
  const [todoTitle , setTodoTitle] = useState<string>(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleRenameTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (todoTitle !== todo.title && editTodo) {
      editTodo(todo.id, { ...todo, title: todoTitle });
    }

    if (onSelectedTodo) {
      onSelectedTodo(null);
    }
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTodoTitle(todo.title);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle !== todo.title && editTodo) {
      editTodo(todo.id, { ...todo, title: todoTitle });
    }

    if (onSelectedTodo) {
      onSelectedTodo(null);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
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
            ref={inputRef}
            type="text"
            className="todo__title-field"
            placeholder="Please edit todo"
            onChange={handleRenameTodo}
            value={todoTitle}
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
  );
};
