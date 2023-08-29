import {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const [isEdit, setIsEdit] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.title);
  const [shouldHandleBlur, setShouldHandleBlur] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCheckbox = () => {
    const setTodosArgs = (prevTodos: Todo[]) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === todo.id) {
          return { ...prevTodo, completed: !prevTodo.completed };
        }

        return prevTodo;
      });
    };

    setTodos(setTodosArgs(todos));
  };

  const removeTodo = (id: number) => {
    const index = todos.findIndex(elem => elem.id === id);

    if (index !== -1) {
      const newTodos = [...todos];

      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const handleDoubleClick = () => {
    setShouldHandleBlur(true);
    setIsEdit(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();

    setTodoValue(newValue === '' ? '' : event.target.value);
  };

  function updateTodo() {
    const newTodoTitle = todoValue;

    const setTodosArgs = (prevTodos: Todo[]) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === todo.id) {
          return { ...prevTodo, title: newTodoTitle };
        }

        return prevTodo;
      });
    };

    setTodos(setTodosArgs(todos));
    setIsEdit(false);
  }

  const handleLabelKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (todoValue.length === 0 && event.key === 'Enter') {
      removeTodo(todo.id);
    }

    if (todoValue.length && event.key === 'Enter') {
      event.preventDefault();
      updateTodo();
    }

    if (event.key === 'Escape') {
      setTodoValue(todo.title);
      setIsEdit(false);
      setShouldHandleBlur(false);
    }
  };

  const handleLabelBlur = () => {
    if (shouldHandleBlur) {
      if (todoValue.length === 0) {
        removeTodo(todo.id);
      }

      updateTodo();
    }
  };

  return (
    <li
      className={classNames('', {
        completed: todo.completed,
        editing: isEdit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={handleCheckbox}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
          aria-label="Delete"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={todoValue}
        onChange={handleLabelChange}
        onKeyDown={handleLabelKeyDown}
        onBlur={handleLabelBlur}
        ref={inputRef}
      />
    </li>
  );
};
