import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [todoEditId, setTodoEditId] = useState(0);
  const [todoEditTitle, setTodoEditTitle] = useState(todo.title);
  const { dispatch } = useContext(TodosContext);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoEditId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [todoEditId]);

  const handleStatusChange = () => {
    dispatch({
      type: 'update',
      payload: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'delete',
      payload: { id: todo.id },
    });
  };

  const saveTitleChange = () => {
    dispatch({
      type: 'update',
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
        dispatch({
          type: 'delete',
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
