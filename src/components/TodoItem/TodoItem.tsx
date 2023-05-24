import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
}) => {
  const { id, title, completed } = todo;
  const [isFormActive, setIsFormActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState(title);

  const toggleTodo = (itemId: number) => {
    setTodos(
      todos.map(item => (
        item.id === itemId
          ? { ...item, completed: !completed }
          : item
      )),
    );
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter(item => item.id !== todoId));
  };

  const renameTodo = (todoId: number, updatedTitle: string) => {
    setTodos(
      todos.map(item => (
        item.id === todoId
          ? { ...item, title: updatedTitle }
          : item
      )),
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!newTitle) {
      deleteTodo(id);

      return;
    }

    if (newTitle !== title) {
      renameTodo(todo.id, newTitle);
    }

    setIsFormActive(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }

    if (event.key === 'Escape') {
      setIsFormActive(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isFormActive },
      )}
      onDoubleClick={() => {
        setIsFormActive(!isFormActive);
      }}
    >
      { !isFormActive
        ? (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={completed}
              onChange={() => toggleTodo(id)}
            />

            <label>{title}</label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="deleteTodo"
              onClick={() => deleteTodo(id)}
            />
          </div>
        ) : (
          <input
            type="text"
            className="edit"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            ref={inputRef}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onBlur={handleSubmit}
          />
        )}
    </li>
  );
};
