import classNames from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { changedTodo, deleteTodo, getTodos } from '../../api/todos';
import { ErrorType } from '../../types/ErrorType';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';
import { ContextTextError } from '../Context/ContextTextError';
import { ContextTodos } from '../Context/ContextTodos';
import { ContextToggleAll } from '../Context/ContextToggleAll';
import { TodoLoader } from '../TodoLoader';

import './TodoItem.scss';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { title, completed, id } = todo;

  const { user } = useContext(AuthContext);
  const userId = user?.id || 0;

  const { setTextError } = useContext(ContextTextError);
  const { todos, setTodos, isAddingTodo } = useContext(ContextTodos);
  const {
    isToggleAllCompleted,
    isToggleAllUnCompleted,
  } = useContext(ContextToggleAll);

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const newTitleField = useRef<HTMLInputElement>(null);

  const unCompletedTodosId = todos.filter((el) => !el.completed)
    .map((el) => el.id);
  const completedTodosId = todos.filter((el) => el.completed)
    .map((el) => el.id);
  const conditionalLoading = (isLoading && (selectedTodoId === id))
  || (isToggleAllUnCompleted && unCompletedTodosId.includes(id))
  || (isToggleAllCompleted && completedTodosId.includes(id))
  || (isAddingTodo && id === 0);

  const handlerDeleteTodo = () => {
    setIsLoading(true);
    setSelectedTodoId(id);
    deleteTodo(id)
      .then(() => {
        getTodos(userId as number)
          .then(todoFromServer => setTodos(todoFromServer))
          .catch(() => setTextError(ErrorType.GET));
      })
      .catch(() => setTextError(ErrorType.DELETE))
      .finally(() => {
        setSelectedTodoId(null);
        setIsLoading(false);
      });
  };

  const handlerToggleClick = () => {
    setIsLoading(true);
    setSelectedTodoId(id);
    changedTodo(id, null, !completed)
      .then(() => getTodos(userId as number)
        .then(result => setTodos(result))
        .catch(() => setTextError(ErrorType.GET)))
      .catch(() => setTextError(ErrorType.PATCH))
      .finally(() => {
        setSelectedTodoId(null);
        setIsLoading(false);
      });
  };

  const handlerSubmitNewTitle = () => {
    if (!newTitle) {
      handlerDeleteTodo();
      setIsEditing(false);

      return;
    }

    if (newTitle === title) {
      setIsEditing(false);

      return;
    }

    setIsEditing(false);
    setIsLoading(true);
    setSelectedTodoId(id);

    changedTodo(id, newTitle, null)
      .then(() => {
        getTodos(userId)
          .then((data) => {
            setTodos(data);
          });
      })
      .catch(() => setTextError(ErrorType.PATCH))
      .finally(() => {
        setSelectedTodoId(null);
        setIsLoading(false);
        setSelectedTodoId(null);
      });
  };

  useEffect(() => {
    if (newTitleField.current) {
      newTitleField.current.focus();
    }
  });

  return (
    <li
      className={classNames(
        'todo-item',
        { 'todo-item--completed': completed },
        { 'todo-item--editing': isEditing },
      )}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="todo-item__view">
        <input
          type="checkbox"
          className={classNames(
            'todo-item__toggle',
            { 'todo-item__toggle--completed': completed },
          )}
          onClick={handlerToggleClick}
        />
        <label className="todo-item__text">
          {title}
        </label>
        <button
          type="button"
          className="todo-item__destroy"
          data-cy="deleteTodo"
          onClick={handlerDeleteTodo}
          aria-label="Delete Todo"
        />
      </div>
      {isEditing && (
        <form onSubmit={(event) => {
          event.preventDefault();
          handlerSubmitNewTitle();
        }}
        >
          <input
            ref={newTitleField}
            type="text"
            className="todo-item__edit"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onBlur={() => handlerSubmitNewTitle()}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            onKeyDown={(event) => {
              switch (event.key) {
                case 'Enter':
                  handlerSubmitNewTitle();
                  break;
                case 'Escape':
                  setIsEditing(false);
                  break;

                default:
                  break;
              }
            }}
          />
        </form>
      )}

      {conditionalLoading && <TodoLoader />}
    </li>
  );
});
