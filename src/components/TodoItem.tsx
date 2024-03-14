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

  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoEditId && editRef.current) {
      editRef.current.focus();
    }
  }, [todoEditId]);

  const handleStatusChange = () => {
    dispatch({
      type: 'update',
      payload: {
        id: todo.id,
        title: todo.title,
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

  const saveChanges = () => {
    dispatch({
      type: 'update',
      payload: {
        id: todo.id,
        title: todoEditTitle,
        completed: todo.completed,
      },
    });

    setTodoEditId(0);
  };

  const handleTitleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (todoEditTitle) {
        saveChanges();
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
    <>
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
          ref={editRef}
          value={todoEditTitle}
          onChange={event => setTodoEditTitle(event.target.value)}
          onKeyUp={event => handleTitleChange(event)}
          onBlur={saveChanges}
        />
      </li>

      {/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </>
  );
};

export default TodoItem;
