import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { TodosContext } from '../../utils/TodosContext';
import { State, Todo } from '../../type/type';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const { todos, setTodos } = React.useContext<State>(TodosContext);

  const [inputValue, setInputValue] = React.useState(title);
  const [isEditing, setIsEditing] = React.useState(false);

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [isEditing]);

  const handleCheckbox = () => {
    setTodos(
      todos.map(prevTodo => {
        return prevTodo.id === todo.id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo;
      }),
    );
  };

  const handleDeleteTodo = () => {
    setTodos(todos.filter(prevTodo => prevTodo.id !== todo.id));
  };

  const handleAddNewTitle = () => {
    if (inputValue === '') {
      handleDeleteTodo();
      setIsEditing(false);

      return;
    }

    setTodos(
      todos.map(prevTodo => {
        return prevTodo.id === todo.id
          ? { ...prevTodo, title: inputValue.trim() }
          : prevTodo;
      }),
    );

    setIsEditing(false);
    setInputValue(inputValue.trim());
  };

  const handleInputButtons = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddNewTitle();
    }

    if (event.key === 'Escape') {
      setInputValue(title);
      setIsEditing(false);
    }
  };

  const hadleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <li
      className={cn({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onClick={handleCheckbox}
        />

        <label onDoubleClick={() => setIsEditing(true)}>{title}</label>

        <button
          id="delete-button"
          type="button"
          aria-label="Destroy"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={inputValue}
        ref={inputField}
        onChange={hadleInputChange}
        onBlur={handleAddNewTitle}
        onKeyUp={handleInputButtons}
      />
    </li>
  );
};

export default TodoItem;
