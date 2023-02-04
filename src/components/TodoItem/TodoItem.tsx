import React, {
  useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  isAdding: boolean,
  removeTodo: (id: number) => void,
  toggleTodo: (todo: Todo) => void,
  updateTodoTitle: (todoTitle: string, todo: Todo) => void,
  todoIdsForLoader: number[],
};

export const TodoItem = React.memo(
  ({
    todo,
    isAdding,
    removeTodo,
    toggleTodo,
    updateTodoTitle,
    todoIdsForLoader,
  }: Props) => {
    const [todoTitle, setTodoTitle] = useState(todo.title);
    const [isEditing, setIsEditing] = useState(false);
    const newTodoTitleField = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (newTodoTitleField.current) {
        newTodoTitleField.current.focus();
      }
    });

    const handleSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      switch (todoTitle) {
        case '':
          removeTodo(todo.id);

          return;
        case todo.title:
          setIsEditing(false);

          return;
        default:
          break;
      }

      updateTodoTitle(todoTitle, todo);
      setIsEditing(false);
    };

    const handleChangeTodoStatus = () => toggleTodo(todo);
    const handleDblClickTodo = () => setIsEditing(true);
    const handleClickRemoveTodo = () => removeTodo(todo.id);
    const handleChangeTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => (
      setTodoTitle(e.target.value)
    );
    const handleBlurTodoTitle = () => updateTodoTitle(todoTitle, todo);
    const handleKeyDownEscape = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
        setTodoTitle(todo.title);
      }
    };

    return (
      <div
        data-cy="Todo"
        className={todo.completed ? 'todo completed' : 'todo'}
        key={todo.id}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            onChange={handleChangeTodoStatus}
          />
        </label>

        <span
          data-cy="TodoTitle"
          className={classNames(
            'todo__title',
            { hidden: isEditing },
          )}
          onDoubleClick={handleDblClickTodo}
        >
          {todoTitle}
        </span>

        <button
          type="button"
          className={classNames(
            'todo__remove',
            { hidden: isEditing },
          )}
          data-cy="TodoDeleteButton"
          onClick={handleClickRemoveTodo}
        >
          ×
        </button>

        <form
          onSubmit={handleSubmitUpdate}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className={classNames(
              'todo__title-field',
              { hidden: !isEditing },
            )}
            placeholder="Empty todo will be deleted"
            value={todoTitle}
            ref={newTodoTitleField}
            onChange={handleChangeTodoTitle}
            onBlur={handleBlurTodoTitle}
            onKeyDown={handleKeyDownEscape}
          />
        </form>

        <div
          data-cy="TodoLoader"
          className={
            classNames(
              'modal',
              'overlay',
              {
                'is-active': isAdding || todoIdsForLoader.includes(todo.id),
              },
            )
          }
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  },
);
