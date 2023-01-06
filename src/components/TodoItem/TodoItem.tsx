import classNames from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { changedTodo, deleteTodo } from '../../api/todos';
import { ErrorType } from '../../types/ErrorType';
import { Todo } from '../../types/Todo';
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

  const deleteTodoOnServer = async () => {
    try {
      await deleteTodo(id);
      setTodos(curentTodos => [...curentTodos].filter(el => el.id !== id));
    } catch {
      setTextError(ErrorType.DELETE);
    } finally {
      setSelectedTodoId(null);
      setIsLoading(false);
    }
  };

  const changedTodoOnServer = async (
    updateTitle: string | null,
    updateCompleted: boolean | null,
  ) => {
    try {
      await changedTodo(id, updateTitle, updateCompleted);
      setTodos(curentTodos => [...curentTodos].map(el => {
        if (el.id === id) {
          if (updateCompleted !== null) {
            return { ...el, completed: !el.completed };
          }

          if (updateTitle !== null) {
            return { ...el, title: updateTitle };
          }
        }

        return el;
      }));
    } catch (error) {
      setTextError(ErrorType.PATCH);
    }
  };

  const handlerDeleteTodo = () => {
    setIsLoading(true);
    setSelectedTodoId(id);
    deleteTodoOnServer();
  };

  const handlerToggleClick = () => {
    setIsLoading(true);
    setSelectedTodoId(id);
    changedTodoOnServer(null, !completed)
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
    changedTodoOnServer(newTitle, null)
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
            onChange={({ target }) => {
              setNewTitle(target.value);
            }}
            onKeyDown={({ key }) => {
              switch (key) {
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
