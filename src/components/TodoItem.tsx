import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { Action } from '../enums/Action';
import { useTodosContext } from '../hooks/useTodosContext';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [todoEditId, setTodoEditId] = useState(0);
  const [todoEditTitle, setTodoEditTitle] = useState(todo.title);
  const { updateTodos } = useTodosContext();

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoEditId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [todoEditId]);

  const handleStatusChange = () => {
    updateTodos({
      type: Action.Update,
      payload: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  const handleDelete = () => {
    updateTodos({
      type: Action.Delete,
      payload: { id: todo.id },
    });
  };

  const saveTitleChange = () => {
    updateTodos({
      type: Action.Update,
      payload: {
        ...todo,
        title: todoEditTitle,
      },
    });

    setTodoEditId(0);
  };

  const handleTitleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (todoEditTitle.trim()) {
        saveTitleChange();
      } else {
        updateTodos({
          type: Action.Delete,
          payload: {
            id: todo.id,
          },
        });

        setTodoEditId(0);
      }
    }

    if (event.key === 'Escape') {
      setTodoEditId(0);
      setTodoEditTitle(todo.title);
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: todo.id === todoEditId,
      })}
      onDoubleClick={() => setTodoEditId(todo.id)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleStatusChange}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editInputRef}
        value={todoEditTitle}
        onChange={event => setTodoEditTitle(event.target.value)}
        onKeyUp={handleTitleChange}
        onBlur={saveTitleChange}
      />
    </li>
  );
};

export default TodoItem;
