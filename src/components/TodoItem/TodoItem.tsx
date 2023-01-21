import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { DefaultContext } from '../DefaultContext';
import { patchTodo, deleteTodo } from '../../api/todos';
import { ErrorContext } from '../ErrorNotification/ErrorContext';
import { Errors } from '../../types/Errors';

type Props = {
  todo: Todo,
  isAdding: boolean,
};

export const TodoItem = React.memo(
  ({
    todo, isAdding,
  }: Props) => {
    const {
      todosFromServer,
      setTodosFromServer,
      todoIdsForLoader,
      setTodoIdsForLoader,
    } = useContext(DefaultContext);
    const { setError } = useContext(ErrorContext);
    const [todoTitle, setTodoTitle] = useState(todo.title);
    const [isEditing, setIsEditing] = useState(false);
    const newTodoTitleField = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (newTodoTitleField.current) {
        newTodoTitleField.current.focus();
      }
    });

    const removeTodo = async (todoId: number) => {
      try {
        setTodoIdsForLoader([todoId]);
        await deleteTodo(todoId);

        setTodosFromServer([
          ...todosFromServer.filter(toDo => toDo.id !== todoId),
        ]);
      } catch {
        setError(Errors.DELETE);
      } finally {
        setTodoIdsForLoader([]);
      }
    };

    const toggleTodo = async () => {
      try {
        setTodoIdsForLoader([todo.id]);
        const updatedTodo = await patchTodo(todo.id,
          { completed: !todo.completed }) as Todo;

        setTodosFromServer(todosFromServer
          .map(todoOnServer => (todoOnServer.id === updatedTodo.id
            ? updatedTodo
            : todoOnServer)));
      } catch (error) {
        setError(Errors.UPDATE);
      } finally {
        setTodoIdsForLoader([]);
      }
    };

    const updateTodoTitle = async () => {
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

      try {
        setTodoIdsForLoader([todo.id]);

        const updatedTodo = await patchTodo(todo.id,
          { title: todoTitle }) as Todo;

        setTodosFromServer(todosFromServer
          .map(todoOnServer => (todoOnServer.id === updatedTodo.id
            ? updatedTodo
            : todoOnServer)));

        setIsEditing(false);
      } catch {
        setError(Errors.UPDATE);
      } finally {
        setTodoIdsForLoader([]);
      }
    };

    const handleKeyDownEscape = (e: string) => {
      if (e === 'Escape') {
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
            onChange={toggleTodo}
          />
        </label>

        <span
          data-cy="TodoTitle"
          className={classNames(
            'todo__title',
            { hidden: isEditing },
          )}
          onDoubleClick={() => setIsEditing(true)}
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
          onClick={() => removeTodo(todo.id)}
        >
          ×
        </button>

        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodoTitle();
          }}
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
            onChange={e => setTodoTitle(e.target.value)}
            onBlur={updateTodoTitle}
            onKeyDown={e => handleKeyDownEscape(e.key)}
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
