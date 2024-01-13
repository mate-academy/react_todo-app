import cn from 'classnames';
import { useContext, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  id: number
};

export const TodoItem: React.FC<Props> = ({ todo, id }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle]
  = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    const newTodo = {
      ...todos[id],
      completed: !todos[id].completed,
    };

    setTodos((prevTodos) => [
      ...prevTodos.slice(0, id),
      newTodo,
      ...prevTodos.slice(id + 1),
    ]);
  };

  const handleDestroy = () => {
    setTodos((prevTodos) => [
      ...prevTodos.slice(0, id),
      ...prevTodos.slice(id + 1),
    ]);
  };

  const handleDoubleClick = () => {
    setEdit(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.code === 'Escape') {
      setEdit(false);
      setEditedTitle(todo.title);
    }
  };

  const handleBlur = () => {
    setEdit(false);
    if (editedTitle) {
      const newTodo = {
        ...todos[id],
        title: editedTitle,
      };

      setTodos((prevTodoss) => [
        ...prevTodoss.slice(0, id),
        newTodo,
        ...prevTodoss.slice(id + 1),
      ]);
    } else {
      handleDestroy();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: edit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          onChange={handleToggle}
          checked={todo.completed}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {editedTitle}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete Todo"
          onClick={handleDestroy}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={editedTitle}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyPress}
        tabIndex={0}
      />
    </li>
  );
};
