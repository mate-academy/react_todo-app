import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useGlobalState } from '../CustomHooks/useGlobalState';
import { useDispatch } from '../CustomHooks/useDispatch';
import { deleteTodoFromStorage, patchTodoFromStorage } from '../api/todos';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoFormList: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const inputRefFocus = useRef<HTMLInputElement>(null);
  const returnEditionRef = useRef<(e: KeyboardEvent) => void>(() => {});

  const { todos, inputHeaderRef } = useGlobalState();
  const dispatch = useDispatch();

  const deleteTodo = (idToDelete: number) => {
    deleteTodoFromStorage(idToDelete);
    dispatch({ type: 'deleteTodo', payload: idToDelete });

    if (inputHeaderRef?.current) {
      inputHeaderRef.current.focus();
    }
  };

  const updateTodo = (idToUpdate: number, data: Omit<Todo, 'id'>) => {
    patchTodoFromStorage(idToUpdate, data);
    dispatch({ type: 'patchTodo', payload: { id: idToUpdate, data } });
  };

  const toggleCompleted = (
    idToToggle: number,
    completedToToggle: boolean,
    titleToToggle: string,
  ) => {
    const data = {
      completed: !completedToToggle,
      title: titleToToggle,
    };

    updateTodo(idToToggle, data);
  };

  const updateTitleTodo = (
    idToUpdate: number,
    completedToUpdate: boolean,
    titleToUpdate: string,
  ) => {
    const data = {
      completed: completedToUpdate,
      title: titleToUpdate,
    };

    updateTodo(idToUpdate, data);
  };

  useEffect(() => {
    const returnEdition = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setEditTitle('');
        setEditingTodoId(null);
      }
    };

    returnEditionRef.current = returnEdition;

    if (editingTodoId !== null) {
      window.addEventListener('keyup', returnEditionRef.current);
    }

    return () => {
      if (returnEditionRef.current) {
        window.removeEventListener('keyup', returnEditionRef.current);
      }
    };
  }, [editingTodoId]);

  const handleEditTodo = (idTodo: number, titleTodo: string) => {
    setEditingTodoId(idTodo);
    setEditTitle(titleTodo);
  };

  useEffect(() => {
    if (editingTodoId !== null && inputRefFocus.current) {
      inputRefFocus.current.focus();
    }
  }, [editingTodoId]);

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.currentTarget.value);
  };

  const submitEditTitle = (idTodo: number) => {
    const index = todos.findIndex(t => idTodo === t.id);

    if (todos[index].title === editTitle) {
      setEditTitle('');
      setEditingTodoId(null);

      return;
    }

    if (editTitle.trim().length === 0) {
      deleteTodo(idTodo);

      return;
    }

    updateTitleTodo(idTodo, todos[index].completed, editTitle.trim());
    setEditTitle('');
    setEditingTodoId(null);
  };

  const handleSubmitEditTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitEditTitle(id);
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

      {editingTodoId !== id && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleEditTodo(id, title)}
          >
            {todo.title}
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
      {editingTodoId === id && (
        <form key={id} onSubmit={handleSubmitEditTitle}>
          <input
            data-cy="TodoTitleField"
            type="text"
            ref={inputRefFocus}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={handleInputTitle}
            onBlur={() => submitEditTitle(id)}
          />
        </form>
      )}
    </div>
  );
};
