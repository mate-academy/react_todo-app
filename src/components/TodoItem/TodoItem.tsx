/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../../TodoProvider';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    id,
  } = todo;

  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);
  const editInput = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    const newTodos = todos.filter(item => item.id !== id);

    setTodos(newTodos);
  };

  useEffect(() => {
    if (editing) {
      editInput.current?.focus();
    }
  }, [editing]);

  const handleEdit = () => {
    if (editing) {
      if (newTitle.trim().length > 0) {
        const newTodos = todos.map(currTodo => {
          if (currTodo.id === id) {
            return {
              ...currTodo,
              title: newTitle,
            };
          }

          return currTodo;
        });

        setTodos(newTodos);
      } else {
        handleDelete();
      }
    } else {
      setNewTitle(title);
    }

    setEditing(false);
  };

  const handleChangeCheck = () => {
    const newTodos = todos.map(currTodo => {
      if (currTodo.id === id) {
        return {
          ...currTodo,
          completed: !completed,
        };
      }

      return currTodo;
    });

    setTodos(newTodos);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditing(false);
    }

    if (event.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <li
      onDoubleClick={() => setEditing(true)}
      className={classNames({
        editing,
        completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleChangeCheck}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editInput}
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onBlur={handleEdit}
        onKeyUp={(event) => handleKeyUp(event)}
      />
    </li>
  );
};
