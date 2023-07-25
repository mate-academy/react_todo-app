import {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import './todoItem.css';
import { Todo } from '../../types';
import { DispatchContext } from '../Store';

type Props = {
  todo: Todo;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [editTodo, setEditTodo] = useState(false);
  const [editQuery, setEditQuery] = useState(todo.title);
  const titleField = useRef<HTMLInputElement>(null);

  const handleSubmitEditTodo = () => {
    const newTitle = editQuery.trim();

    if (newTitle && newTitle !== todo.title) {
      dispatch({
        type: 'editTodo',
        id: todo.id,
        newTodoTitle: newTitle,
      });
    }

    if (!newTitle) {
      dispatch({ type: 'deleteTodo', id: todo.id });
    }

    setEditTodo(false);
  };

  useEffect(() => {
    if (titleField.current && editTodo) {
      titleField.current.focus();
    }

    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditQuery(todo.title);
        handleSubmitEditTodo();
      }
    };

    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [editTodo]);

  return (
    <li className={classNames({
      completed: todo.completed && !editTodo,
      editing: editTodo,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => dispatch({
            type: 'isComplete',
            payLoad: !todo.completed,
            id: todo.id,
          })}
        />

        <label onDoubleClick={() => setEditTodo(true)}>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => dispatch({ type: 'deleteTodo', id: todo.id })}
        />
      </div>

      <form
        onSubmit={handleSubmitEditTodo}
        onBlur={handleSubmitEditTodo}
      >
        <input
          type="text"
          className="edit"
          ref={titleField}
          value={editQuery}
          onChange={(event) => setEditQuery(event.target.value)}
        />
      </form>
    </li>
  );
};
