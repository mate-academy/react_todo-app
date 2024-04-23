import React, { useContext, useEffect, useState, useRef } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { DispatchContext } from '../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const [startChangeTodo, setStartChangeTodo] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const editingField = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => setStartChangeTodo(true);

  const changeTodo = (newTodo: Todo, todoId: number) => {
    dispatch({ type: 'changeTodo', newTodo, id: todoId });
  };

  const removeTodo = () => {
    dispatch({ type: 'remove', id: todo.id });
  };

  const updateTitle = (value: string) => {
    changeTodo({ ...todo, title: value } as Todo, todo.id);
  };

  const saveTitle = (newTitle: string) => {
    if (title.trim() === '') {
      dispatch({ type: 'remove', id: todo.id });

      return;
    }

    updateTitle(newTitle.trim());
    setStartChangeTodo(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setStartChangeTodo(false);
      setTitle(todo.title);
    } else if (event.key === 'Enter') {
      saveTitle(title);
    }
  };

  useEffect(() => {
    if (startChangeTodo) {
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      };
    }

    return;
  });

  useEffect(() => {
    if (startChangeTodo && editingField.current) {
      editingField.current.focus();
    }
  }, [startChangeTodo]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      onDoubleClick={handleDoubleClick}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => dispatch({ type: 'checked', id: todo.id })}
        />
      </label>

      {startChangeTodo ? (
        <form onSubmit={event => event.preventDefault()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={title}
            onBlur={() => saveTitle(title)}
            onChange={handleTitleChange}
          />
        </form>
      ) : (
        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
      )}

      {!startChangeTodo && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={removeTodo}
        >
          ×
        </button>
      )}
    </div>
  );
};
