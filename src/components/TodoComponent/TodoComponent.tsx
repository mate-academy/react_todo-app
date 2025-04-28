import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoType } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: TodoType;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoComponent: React.FC<Props> = React.memo(({ todo }) => {
  const {
    todos,
    inputRef,
    selectedTodo,
    setTodos,
    setGeneralTodos,
    setSelectedTodo,
  } = useContext(TodoContext);
  const { title, completed } = todo;
  const [titleInput, setTitleInput] = useState('');

  const chackedEditActive = selectedTodo && selectedTodo.id === todo.id;

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos(
        todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
      setGeneralTodos(
        todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    },
    [todos, setTodos, setGeneralTodos],
  );

  const removeTodo = useCallback(
    (id: string) => {
      setTodos(todos.filter(t => t.id !== id));
      setGeneralTodos(todos.filter(t => t.id !== id));
    },
    [todos, setTodos, setGeneralTodos],
  );

  const handleEdit = useCallback(() => {
    setSelectedTodo(todo);
    setTitleInput(todo.title);
  }, [todo, setSelectedTodo, setTitleInput]);

  const hendleUpdate = useCallback(() => {
    const updatedTodos = todos.map(t =>
      t.id === todo.id ? { ...t, title: titleInput.trim() } : t,
    );

    setTodos(updatedTodos);
    setGeneralTodos(updatedTodos);
    setSelectedTodo(null);
  }, [todos, todo.id, titleInput, setTodos, setSelectedTodo, setGeneralTodos]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newTitle = titleInput.trim();

      if (newTitle.length === 0) {
        if (selectedTodo) {
          removeTodo(selectedTodo.id);
        }

        setSelectedTodo(null);

        return;
      }

      hendleUpdate();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [hendleUpdate, removeTodo, selectedTodo, setSelectedTodo, titleInput],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, chackedEditActive]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>
      {!chackedEditActive ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleEdit}
        >
          {title}
        </span>
      ) : (
        <form
          onSubmit={e => handleSubmit(e)}
          onKeyUp={e => {
            if (e.key === 'Escape') {
              setSelectedTodo(null);
            }
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
            onBlur={() => hendleUpdate()}
            ref={inputRef}
          />
        </form>
      )}

      {/* Remove button appears only on hover */}
      {!chackedEditActive && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => removeTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
});

TodoComponent.displayName = 'TodoComponent';
