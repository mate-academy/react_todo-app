import cn from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../Interface/Todo';
import { TodosContext } from '../../TodoContext/TodosContext';
import { KeyUpStatus } from '../../Enum/KeyUpStatus';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos, setToggleAllStatus } = useContext(TodosContext);
  const [editStatus, setEditStatus] = useState(false);
  const [editInputValue, setEditInputValue] = useState(todo.title);
  const editFocus = useRef<HTMLInputElement>(null);

  const handleCompleteTodo = () => {
    setTodos(currentTodos => {
      const newTodos = currentTodos.map(todoItem => (
        todo.id === todoItem.id
          ? { ...todoItem, completed: !todo.completed }
          : todoItem
      ));

      const completedAllStatus = newTodos
        .filter(todoItem => !todoItem.completed);

      if (completedAllStatus.length < 1) {
        setToggleAllStatus(true);
      } else {
        setToggleAllStatus(false);
      }

      return newTodos;
    });
  };

  const handleDeleteTodo = () => {
    setTodos(currentTodos => currentTodos
      .filter(todoItem => todoItem.id !== todo.id));
  };

  useEffect(() => {
    if (editFocus.current) {
      editFocus.current.focus();
    }
  }, [editStatus]);

  const handleOnBlur = () => {
    if (!editInputValue) {
      setTodos(currentTodos => currentTodos
        .filter(todoItem => todoItem.id !== todo.id));

      return;
    }

    setTodos((currentTodos) => currentTodos.map(todoItem => {
      return todo.id === todoItem.id
        ? { ...todoItem, title: editInputValue.trim() }
        : todoItem;
    }));

    setEditStatus(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === KeyUpStatus.Enter) {
      handleOnBlur();
    } else {
      setEditInputValue(todo.title);
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
          onChange={() => handleCompleteTodo()}
          className="toggle"
          checked={todo.completed}
          id="toggle-view"
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo()}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editInputValue}
        ref={editFocus}
        onChange={(event) => setEditInputValue(event.target.value)}
        onKeyUp={(event) => (
          event.key === KeyUpStatus.Enter || KeyUpStatus.ESC === event.key
            ? handleKeyUp(event)
            : null
        )}
        onBlur={() => handleOnBlur()}
      />
    </li>
  );
};
