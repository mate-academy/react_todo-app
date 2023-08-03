/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { useTodo } from '../../context/TodosContext';
import { KeyUpStatus } from '../../Enum/KeyUpStatus';

type Props = {
  id: number,
  title: string,
  completed: boolean,
};

export const TodoItem: React.FC<Props> = ({ title, completed, id }) => {
  const { todos, setTodos } = useTodo();
  const [editTitle, setEditTitle] = useState(false);
  const [editedValue, setEditedValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const todoDestroy = (todoId: number) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(newTodos);
  };

  const handleTodoComplete = (todoId: number) => {
    const newTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnBlur = () => {
    if (!editedValue) {
      const newTodos = todos.filter(todo => todo.id !== id);

      setTodos(newTodos);

      return;
    }

    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: editedValue.trim(),
        };
      }

      return todo;
    });

    setTodos(newTodos);
    setEditTitle(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === KeyUpStatus.Enter) {
      handleOnBlur();
    } else if (key === KeyUpStatus.ESC) {
      setEditTitle(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editTitle]);

  return (
    <li
      data-id={id}
      className={classNames({
        completed,
        editing: editTitle,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => handleTodoComplete(id)}
        />
        <label
          onDoubleClick={() => setEditTitle(!editTitle)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => todoDestroy(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        ref={inputRef}
        onKeyUp={handleKeyUp}
        onBlur={handleOnBlur}
      />
    </li>
  );
};
