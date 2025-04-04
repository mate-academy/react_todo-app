/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { TodosContext } from '../Contexts/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdited, setTitleEdited] = useState(todo.title);
  const { setTodos } = useContext(TodosContext);

  const handleChangeStatus = () => {
    setTodos(prevTodos =>
      prevTodos.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const onDeleteBtnHandler = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todoId));
  };

  const onEditTodoTitle = (todoId: number, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos
        .map(tod =>
          tod.id === todoId ? { ...todo, title: newTitle.trim() } : tod,
        )
        .filter(to => to.title !== ''),
    );

    setIsEditing(false);
  };

  function keyupHandler(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', keyupHandler);

    return () => {
      document.removeEventListener('keyup', keyupHandler);
    };
  }, [isEditing]);

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleChangeStatus}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            onEditTodoTitle(todo.id, titleEdited);
          }}
          className="todo__edit-form"
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={titleEdited}
            onChange={e => setTitleEdited(e.target.value)}
            onBlur={() => {
              onEditTodoTitle(todo.id, titleEdited);
            }}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDeleteBtnHandler(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};
