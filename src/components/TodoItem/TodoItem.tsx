import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  removeOneTodo: (todoId: number) => void;
  todoAction: number[];
  changeOneTodoStatus: (todoId: number, completed: boolean) => void;
  editTodo: (todoId: number, todoName: string) => void;
  editingTodo: number;
  changeTitle: (editingTodo: number, newName: string) => void;
};

export const TodoItem: React.FC<Props> = (
  {
    todo,
    removeOneTodo,
    todoAction,
    changeOneTodoStatus,
    editTodo,
    editingTodo,
    changeTitle,
  },
) => {
  const [newName, setNewName] = useState<string>('');
  const [focusOnEditingTodo, setFocusOnEditingTodo] = useState<boolean>(false);
  const editingTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodoField.current) {
      editingTodoField.current.focus();
    }
  }, [focusOnEditingTodo]);

  const newTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const exitEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      editTodo(0, '');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editTodo(0, '');

    if (newName === todo.title) {
      return null;
    }

    if (!newName) {
      return removeOneTodo(editingTodo);
    }

    return changeTitle(editingTodo, newName);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo', {
          completed: todo.completed,
        },
      )}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => changeOneTodoStatus(todo.id, !todo.completed)}
        />
      </label>

      {editingTodo === todo.id
        ? (
          <form
            onSubmit={handleSubmit}
            onBlur={handleSubmit}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              defaultValue={todo.title}
              onChange={newTodoTitle}
              onKeyDown={exitEditing}
              ref={editingTodoField}
            />
          </form>
        )
        : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                editTodo(todo.id, todo.title);
                setNewName(todo.title);
                setFocusOnEditingTodo(!focusOnEditingTodo);
              }}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
              onClick={() => removeOneTodo(todo.id)}
            >
              ×
            </button>
          </>
        )}

      {todoAction.length > 0 && (
        <div
          data-cy="TodoLoader"
          className={classNames(
            'modal overlay',
            {
              'is-active': todoAction.includes(todo.id),
            },
          )}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
