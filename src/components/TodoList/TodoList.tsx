/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Dispatch, useEffect, useState } from 'react';
import { response } from '../../api/api';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onDelete: Dispatch<React.SetStateAction<boolean>>,
  onEdit: Dispatch<React.SetStateAction<boolean>>,
};

export const TodoList: React.FC<Props> = ({ todos, onDelete, onEdit }) => {
  const [hasEdit, setHasEdit] = useState(0);
  const [editText, setEditText] = useState('');
  const [countClick, setCountClick] = useState(0);

  const handleClickDelete = (todoId: number) => {
    response(`/todos/${todoId}`, { method: 'DELETE' });
    onDelete(true);
  };

  const handleClickEdit = (todoId: number) => {
    setCountClick(countClick + 1);
    if (countClick === 1) {
      setEditText('');
      setHasEdit(todoId);
      setCountClick(0);
    }
  };

  const handleClickCompleted = (todo: Todo) => {
    response(`/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });
    onEdit(true);
  };

  const handleSubmit = (event: React.SyntheticEvent, todo: Todo) => {
    event.preventDefault();

    response(`/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editText,
      }),
    });

    setHasEdit(0);
    onEdit(true);
  };

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Escape') {
        setHasEdit(0);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={classNames(
            { editing: hasEdit === todo.id },
          )}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => handleClickCompleted(todo)}
            />
            <label
              onClick={() => handleClickEdit(todo.id)}
            >
              {todo.title}
            </label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => handleClickDelete(todo.id)}
            />
          </div>
          <form onSubmit={(event) => handleSubmit(event, todo)}>
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={(event) => {
                setEditText(event.target.value);
              }}
            />
          </form>
        </li>
      ))}
    </ul>
  );
};
