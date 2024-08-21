import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from '../castomHuks/useDispatch';
import { deleteTodoFromStorage, patchTodoFromStorage } from '../api/todos';
import classNames from 'classnames';
import { useGlobalState } from '../castomHuks/useGlobalState';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoFromList: React.FC<Props> = ({ todo }) => {
  const [isEditTodo, setIsEditTodo] = useState<{
    [id: number]: boolean;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const inputRefFocus = useRef<HTMLInputElement>(null);
  const returnEditionRef = useRef<(e: KeyboardEvent) => void>(() => {});

  const { todos, inputHeaderRef } = useGlobalState();
  const dispatch = useDispatch();

  const deleteTodo = (id: number) => {
    deleteTodoFromStorage(id);
    dispatch({ type: 'deleteTodo', payload: id });

    if (inputHeaderRef?.current) {
      inputHeaderRef.current.focus();
    }
  };

  const updatedTodo = (id: number, data: Omit<Todo, 'id'>) => {
    patchTodoFromStorage(id, data);
    dispatch({ type: 'patchTodo', payload: { id, data } });
  };

  const toggleCompleted = (id: number, completed: boolean, title: string) => {
    const data = {
      completed: !completed,
      title: title,
    };

    updatedTodo(id, data);
  };

  const updateTitleTodo = (id: number, completed: boolean, title: string) => {
    const data = {
      completed: completed,
      title: title,
    };

    updatedTodo(id, data);
  };

  const { id, completed, title } = todo;

  useEffect(() => {
    const returnEdition = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setEditTitle('');
        setIsEditTodo(null);
        setIsEditing(false);
      }
    };

    returnEditionRef.current = returnEdition;

    if (isEditTodo) {
      window.addEventListener('keyup', returnEditionRef.current);
    }

    return () => {
      if (returnEditionRef.current) {
        window.removeEventListener('keyup', returnEditionRef.current);
      }
    };
  }, [isEditTodo]);

  const handleEditTodo = (idTodo: number, titleTodo: string) => {
    setIsEditTodo(null);
    setIsEditTodo({ [idTodo]: true });
    setEditTitle(titleTodo);
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && inputRefFocus.current) {
      inputRefFocus.current.focus();
    }
  }, [isEditing]);

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.currentTarget.value);
  };

  const submitEditTitle = (idTodo: number) => {
    const index = todos.findIndex(t => idTodo === t.id);

    if (todos[index].title === editTitle) {
      setEditTitle('');
      setIsEditTodo(null);
      setIsEditing(false);

      return;
    }

    if (editTitle.length === 0) {
      deleteTodo(idTodo);

      return;
    }

    updateTitleTodo(idTodo, todos[index].completed, editTitle.trim());
    setEditTitle('');
    setIsEditTodo(null);
    setIsEditing(false);
  };

  const handleBlur = (idTodo: number) => {
    submitEditTitle(idTodo);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => toggleCompleted(id, completed, title)}
        />
      </label>

      {(isEditTodo === null || isEditTodo[id] === undefined) && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleEditTodo(id, title)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
      {isEditTodo !== null && isEditTodo[id] && (
        <form
          key={id}
          onSubmit={e => {
            e.preventDefault();
            submitEditTitle(id);
          }}
        >
          {isEditing && (
            <input
              data-cy="TodoTitleField"
              type="text"
              ref={inputRefFocus}
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editTitle}
              onChange={handleInputTitle}
              onBlur={() => handleBlur(id)}
            />
          )}
        </form>
      )}
    </div>
  );
};
