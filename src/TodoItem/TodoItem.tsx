/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';

import { Todo } from '../Interface/Todo';
import { TodosContext } from '../TodosContext/TodosContext';
import { KeyUpStatus } from '../enum/KeyUpStatus';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, setToggleAllStatus } = useContext(TodosContext);
  const [editStatus, setEditStatus] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const editFocus = useRef<HTMLInputElement>(null);

  const handleDeleteTodo = () => {
    const newTodos = todos.filter(currentTodo => currentTodo.id !== todo.id);

    setTodos(newTodos);
  };

  const handleTodoStatus = () => {
    const updatedTodosStatus = todos
      .map(currentTodo => (currentTodo.id === todo.id
        ? { ...currentTodo, completed: !todo.completed }
        : currentTodo));

    setTodos(updatedTodosStatus);

    const completedAllStatus = updatedTodosStatus
      .filter(todoItem => !todoItem.completed);

    setToggleAllStatus(completedAllStatus.length < 1);
  };

  useEffect(() => {
    if (editFocus.current) {
      editFocus.current.focus();
    }
  }, [editStatus]);

  const handleOnBlur = () => {
    if (!inputValue) {
      const notEditedTodos = todos.filter(todoItem => todoItem.id !== todo.id);

      setTodos(notEditedTodos);

      return;
    }

    const editedTodos = todos
      .map(todoItem => (todoItem.id === todo.id
        ? { ...todoItem, title: inputValue.trim() }
        : todoItem
      ));

    setTodos(editedTodos);

    setEditStatus(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === KeyUpStatus.Enter) {
      handleOnBlur();
    } else {
      setInputValue(todo.title);
      setEditStatus(false);
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: editStatus,
      })}
      onDoubleClick={() => setEditStatus(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id="toggle-view"
          onChange={handleTodoStatus}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        ref={editFocus}
        className="edit"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onBlur={handleOnBlur}
        onKeyUp={(event) => (
          event.key === KeyUpStatus.Enter
            || event.key === KeyUpStatus.ESC ? handleKeyUp(event) : null
        )}
      />
    </li>
  );
};
