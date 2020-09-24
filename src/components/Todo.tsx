import React, { useState } from 'react';
import classnames from 'classnames';

export type InTodo = {
  id: number;
  title: string;
  completed: boolean;
};

interface InTodoData {
  id: number;
  title: string;
  completed: boolean;
  setTodos: (x: InTodo[]) => void;
  todos: InTodo[];
  // ((current: InTodo[]) => void) => void;

}

export function Todo({
  title,
  completed,
  id,
  setTodos,
  todos,
}: InTodoData) {
  const [onEditStatus, setEditStatus] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>(title);

  const removeTodo = () => (
    setTodos(todos.filter(elem => elem.id !== id))
  );

  const changeCheckbox = () => {
    setTodos(todos.map((elem: InTodo) => {
      if (elem.id === id) {
        return { ...elem, completed: !elem.completed };
      }

      return elem;
    }));
  };

  const onBlur = () => {
    if (!todoText) {
      removeTodo();
      setEditStatus(false);
    } else {
      setTodoText(todoText.trim());
      setTodos(todos.map((elem: InTodo) => {
        if (elem.id === id) {
          return { ...elem, title: todoText };
        }

        return elem;
      }));
      setEditStatus(false);
    }
  };

  const onKeyPush = (key: string) => {
    if (key === 'Enter') {
      onBlur();
    } else if (key === 'Escape') {
      setTodoText(title);
      setEditStatus(false);
    }
  };

  return (
    <li className={classnames({
      completed,
      editing: onEditStatus,
    })}
    >
      <div>
        <input
          id="id"
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => changeCheckbox()}
        />

        {!onEditStatus && (
          <label
            htmlFor="id"
            onDoubleClick={() => setEditStatus(true)}
          >
            {title}
          </label>
        )}
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo()}
        >
          x
        </button>
      </div>
      {onEditStatus && (
        <input
          type="text"
          className="edit"
          value={todoText}
          onChange={event => setTodoText(event.target.value.trimLeft())}
          onKeyDown={event => onKeyPush(event.key)}
          onBlur={onBlur}
        />
      )}
    </li>
  );
}

// Todo.propTypes = {
//   completed: PropTypes.bool.isRequired,
//   title: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
//   setTodos: PropTypes.func.isRequired,
// };
