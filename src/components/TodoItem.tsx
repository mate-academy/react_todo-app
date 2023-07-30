/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { todos, setTodos } = useContext(TodosContext);

  const [isChecked, setIsChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setIsChecked(completed);
  }, [completed]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCompletedValue = event.target.checked;

    setIsChecked(newCompletedValue);
    const updatedTodo = { ...todo, completed: newCompletedValue };

    const mapTodo = (prevTodos: Todo[]) => prevTodos.map(t => (t.id === id
      ? updatedTodo : t));

    setTodos(mapTodo(todos));
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleDeleteClick = (todoC: Todo) => {
    const filterTodo = todos.filter((todoitem) => todoitem !== todoC);

    setTodos(filterTodo);
  };

  const handleDeleteButtonClick = () => {
    handleDeleteClick(todo);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.target.value.trim() === '') {
        handleDeleteClick(todo);

        return;
      }

      const mapTodo = (prevTodos: Todo[]) => prevTodos.map((todoItem) => (
        todoItem.id === id
          ? { ...todoItem, title: newTitle }
          : todoItem
      ));

      setTodos(mapTodo(todos));
      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  return (
    <li
      className={classNames(
        { completed: isChecked },
        { editing: isEditing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteButtonClick}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleInputChange}
        onBlur={() => setIsEditing(false)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </li>
  );
};
