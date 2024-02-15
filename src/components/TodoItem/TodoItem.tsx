import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const textField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      textField.current?.focus();
    }
  }, [isEditing]);

  const handelCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodos = todos.map(el => {
      if (el.id === todo.id) {
        switch (e.target.checked) {
          case true:
            return { ...el, completed: true };

          default:
            return { ...el, completed: false };
        }
      }

      return el;
    });

    setTodos(newTodos);
  };

  const activeEdit = () => {
    setIsEditing(true);
  };

  const destroy = () => {
    const newTodos = todos.filter(el => el.id !== todo.id);

    setTodos(newTodos);
  };

  const save = () => {
    setIsEditing(false);

    if (value.trim() === '') {
      destroy();

      return;
    }

    const newTodos = todos.map(el => {
      if (el.id === todo.id) {
        return { ...el, title: value };
      }

      return el;
    });

    setTodos(newTodos);
  };

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handelEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handelEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setValue(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={classNames('', {
        completed: todo.completed && !isEditing,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handelCheck}
          checked={todo.completed}
        />

        <label
          onDoubleClick={activeEdit}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={destroy}
          aria-label="Delete Todo"
        />
      </div>

      <input
        ref={textField}
        type="text"
        className="edit"
        value={value}
        onChange={handelChange}
        onBlur={save}
        onKeyDown={handelEnter}
        onKeyUp={handelEscape}
      />
    </li>
  );
};
