/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../contexts/TodoContext';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onDoubleClick: () => void;
  onCancelEditing: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isEditing,
  onDoubleClick,
  onCancelEditing,
}) => {
  const [inputValue, setInputValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const { dispatch } = useContext(TodoContext);

  const submitChanges = () => {
    if (inputValue.length === 0) {
      dispatch({ type: 'destroyTodo', todoId: todo.id });
    } else {
      dispatch({ type: 'editTodo', todoId: todo.id, newTitle: inputValue });
    }

    onCancelEditing();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitChanges();
    }
  };

  const handleEscChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setInputValue(todo.title);
      submitChanges();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={() => dispatch({
            type: 'toggleTodoStatus',
            todoId: todo.id,
          })}
        />
        <label
          onDoubleClick={onDoubleClick}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => dispatch({ type: 'destroyTodo', todoId: todo.id })}
        />
      </div>
      <input
        id={todo.title}
        type="text"
        className="edit"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        ref={inputRef}
        onBlur={submitChanges}
        onKeyUp={handleEscChange}
      />
    </li>
  );
};
