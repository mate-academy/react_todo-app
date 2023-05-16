import React, { useState } from 'react';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TempTodo } from '../TempTodo';

type Props = {
  todos: Todo[] | null;
  newTodoTitle: string;
  isTodoAdded: boolean;
  removeTodo: (targetId: number) => void;
  targetTodosIds: number[];
  changeTodoStatus: (todoId: number, status: boolean) => void;
  enterEditMode: (title: string) => void;
  updatingTitle: string;
  setUpdatingTitle: (value: string) => void;
  submitTitleUpdating: (id: number, oldTitle: string) => void;
};

export const Todos: React.FC<Props> = ({
  todos,
  newTodoTitle,
  isTodoAdded,
  removeTodo,
  targetTodosIds,
  changeTodoStatus,
  enterEditMode,
  updatingTitle,
  setUpdatingTitle,
  submitTitleUpdating,
}) => {
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);

  const handleKeyDown = (
    todo: Todo,
  ) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitTitleUpdating(todo.id, todo.title);
      setEditedTodoId(null);
    }

    if (event.key === 'Escape') {
      setUpdatingTitle(todo.title);
      setEditedTodoId(null);
    }
  };

  const handleBlur = (todo: Todo) => () => {
    submitTitleUpdating(todo.id, todo.title);
    setEditedTodoId(null);
  };

  const handledblClick = (todo: Todo) => () => {
    enterEditMode(todo.title);
    setEditedTodoId(todo.id);
  };

  return (
    <TransitionGroup>
      {todos?.map(todo => (
        <CSSTransition
          key={todo.id}
          timeout={300}
          classNames="item"
        >
          <div
            id={`${todo.id}`}
            className={classNames('todo', { completed: todo.completed })}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => changeTodoStatus(todo.id, !todo.completed)}
              />
            </label>

            {editedTodoId === todo.id ? (
              <form>
                <input
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={updatingTitle}
                  onChange={(event) => setUpdatingTitle(event.target.value)}
                  onKeyDown={handleKeyDown(todo)}
                  onBlur={handleBlur(todo)}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              </form>
            )
              : (
                <>
                  <span
                    className="todo__title"
                    onDoubleClick={handledblClick(todo)}
                  >
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    onClick={() => removeTodo(todo.id)}
                  >
                    ×
                  </button>
                </>
              )}

            <div className={classNames(
              'modal',
              'overlay',
              { 'is-active': targetTodosIds.includes(todo.id) },
            )}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </CSSTransition>
      ))}
      { isTodoAdded && (
        <CSSTransition
          key={0}
          timeout={300}
          classNames="temp-item"
        >
          <TempTodo title={newTodoTitle} />
        </CSSTransition>
      ) }
    </TransitionGroup>
  );
};
