import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  deleteTodoIds: number[],
  updatedTodoIds: number[],
  deleteTodo: (currentId: number) => Promise<void>,
  updateTodo: (updatedTodo: Todo) => Promise<void>,
  checkTodo: (selectedTodo: Todo, isCompleted?: boolean) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodoIds,
  updatedTodoIds,
  deleteTodo,
  updateTodo,
  checkTodo,
}) => {
  const { id, title, completed } = todo;
  const [isTodoEditing, setIsTodoEditing] = useState<boolean>(false);
  const [todoEditing, setTodoEditing] = useState<Todo | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const handleDoubleClick = (selectedTodo: Todo) => {
    setIsTodoEditing(true);
    setTodoEditing(selectedTodo);
    setNewTitle(selectedTodo.title);
  };

  const handleTodoUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const changeTodoTitle = (event: React.FormEvent, editedTitle: string) => {
    event.preventDefault();

    if (!todoEditing) {
      return;
    }

    if (!editedTitle) {
      deleteTodo(todoEditing.id);
    }

    if (editedTitle !== todoEditing.title) {
      updateTodo({
        ...todoEditing,
        title: editedTitle,
      });
    }

    setIsTodoEditing(false);
  };

  return (
    <div
      className={classNames('todo', { completed })}
      key={id}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={() => checkTodo(todo)}
          readOnly
        />
      </label>

      {(isTodoEditing && todoEditing?.id === id) ? (
        <form onSubmit={(event) => changeTodoTitle(event, newTitle)}>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Will be deleted if empty"
            onChange={handleTodoUpdated}
            value={newTitle}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => handleDoubleClick(todo)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}

      <div className={classNames(
        'modal overlay', {
          'is-active':
            deleteTodoIds.includes(id) || updatedTodoIds.includes(id),
        },
      )}
      >
        <div className="
          modal-background
          has-background-white-ter
        "
        />
        <div className="loader" />
      </div>
    </div>
  );
};
