import classNames from 'classnames';
import {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { TodosContextType } from '../types/TodosContext';
import { TodosContext } from './todosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const {
    changeStatusTodo,
    deleteTodo,
    editeTodoTitle,
  } = useContext(TodosContext) as TodosContextType;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setEdit] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const handleDoubleClick = () => {
    setEdit(true);
  };

  const handleBlur = () => {
    if (todoTitle !== todo.title) {
      editeTodoTitle(todoTitle, todo);
    }

    setEdit(false);
  };

  const handleKeyDown = (
    event: (React.KeyboardEvent<HTMLInputElement>),
  ) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }

    if (event.key === 'Escape') {
      setEdit(false);
    }
  };

  return (
    <li
      className={
        classNames(
          { completed: todo.completed === true },
          { editing: isEdit },
        )
      }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed === true}
          onChange={() => changeStatusTodo(todo)}
        />
        <label onDoubleClick={handleDoubleClick}>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo)}
          aria-label="remove this todo"
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        id={`${todo.id}`}
        className="edit"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </li>
  );
};
