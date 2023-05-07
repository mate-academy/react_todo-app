import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: (value: Todo[]) => void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
}) => {
  const { completed, title, id } = todo;
  const [isFormActive, setIsFormActive] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const onCheck = (itemId: number) => {
    setTodos(
      todos.map((todoItem) => (
        todoItem.id === itemId
          ? { ...todoItem, completed: !completed }
          : todoItem
      )),
    );
  };

  const removeTodo = (todoId: number) => {
    setTodos(todos.filter((item) => item.id !== todoId));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setInputValue(event.target.value);
  };

  const validateTitle = () => {
    if (!inputValue.trim().length) {
      removeTodo(id);

      return false;
    }

    if (title === inputValue.trim()) {
      setIsFormActive(false);

      return false;
    }

    setInputValue(inputValue.trim());
    setIsFormActive(false);

    return true;
  };

  const changeTodoTitle = () => {
    return validateTitle() ? (
      setTodos(
        todos.map((todoItem) => (
          todoItem.id === id ? { ...todoItem, title: inputValue } : todoItem
        )),
      )
    ) : (
      null
    );
  };

  const moveCursorToEndOfInput = (e: React.FocusEvent<HTMLInputElement>) => (
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length,
    )
  );

  function onKeyPressAction(event: React.KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        setInputValue(title);
        setIsFormActive(false);
        break;
      case 'Enter':
        changeTodoTitle();
        break;
      default:
        break;
    }
  }

  return (
    <li
      className={classNames({ completed }, { editing: isFormActive })}
      onDoubleClick={() => setIsFormActive(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${id}`}
          checked={completed}
          onChange={() => onCheck(id)}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        placeholder="Empty todo will be deleted"
        value={inputValue}
        onChange={(event) => handleChange(event)}
        onBlur={() => changeTodoTitle()}
        ref={ref => ref && ref.focus()}
        onFocus={(e) => moveCursorToEndOfInput(e)}
        onKeyDown={onKeyPressAction}
      />
    </li>
  );
};
