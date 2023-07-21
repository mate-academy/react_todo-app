/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../contexts/TodosContext';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  setSelectedTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useContext(TodosContext);

  const [tempTitle, setTempTitle] = useState(todo.title);

  const hadleTodoStatusChange = () => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((item) => item.id === todo.id);

    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;

    setTodos(newTodos);
  };

  const handleTodoDeletion = () => {
    const newTodos = todos.filter((item) => item.id !== todo.id);

    setTodos(newTodos);
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTodo]);

  const handleTodoTitleChange = (
    event: React.FormEvent<HTMLFormElement>
    | React.FocusEvent<HTMLInputElement>,
  ) => {
    if (event instanceof FormDataEvent) {
      event.preventDefault();
    }

    if (tempTitle.trim() === '') {
      handleTodoDeletion();

      return;
    }

    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((item) => item.id === todo.id);

    newTodos[todoIndex].title = tempTitle.trim();

    setSelectedTodo(null);

    setTodos(newTodos);
  };

  const handleCancelEditing = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setTempTitle(todo.title);
      setSelectedTodo(null);
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames({
        completed: todo.completed && selectedTodo?.id !== todo.id,
        editing: selectedTodo?.id === todo.id,
      })}
      onDoubleClick={() => setSelectedTodo(todo)}
      onKeyUp={handleCancelEditing}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          checked={todo.completed}
          onChange={hadleTodoStatusChange}
        />
        <label
          htmlFor={`toggle-${todo.id}`}
          onClick={(event) => event.preventDefault()}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleTodoDeletion}
        />
      </div>
      <form
        onSubmit={handleTodoTitleChange}
      >
        <input
          type="text"
          className="edit"
          value={tempTitle}
          onChange={(event) => setTempTitle(event.target.value)}
          onBlur={handleTodoTitleChange}
          ref={inputRef}
        />
      </form>
    </li>
  );
};
