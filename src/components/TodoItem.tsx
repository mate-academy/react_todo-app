/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/todo';
import { TodosContext } from './Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const {
    todos,
    setTodos,
    completedAll,
    setCompletedAll,
  } = useContext(TodosContext);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.complete);
  const [startLongPress, setStartLongPress] = useState(false);
  const titleField = useRef<HTMLInputElement>(null);

  const updateTodo = useCallback((updatedTodo: Todo) => {
    const updatedTodos = todos.map(upTodo => (
      upTodo.id === updatedTodo.id
        ? { ...updatedTodo }
        : upTodo
    ));

    setTodos(updatedTodos);
  }, [todos]);

  const handleCheckbox = () => {
    setCompleted(!completed);
    const updatedTodo = { ...todo, complete: !completed };

    updateTodo(updatedTodo);
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const applyRemoveTodo = () => {
    const updatedTodos = todos.filter(upTodo => upTodo.id !== todo.id);

    setTodos(updatedTodos);
  };

  const applyEditing = () => {
    if (title !== todo.title) {
      const updatedTodo = { ...todo, title };

      updateTodo(updatedTodo);
    }

    if (title.length === 0) {
      applyRemoveTodo();
    }

    setEditing(!editing);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // switch case?
    if (event.key === 'Enter') {
      titleField.current?.blur();
    }

    if (event.key === 'Enter' && title.length === 0) {
      applyRemoveTodo();
    }

    if (event.key === 'Escape') {
      setTitle(todo.title);
      titleField.current?.blur();
    }
  };

  useEffect(() => {
    let timerId;

    if (startLongPress) {
      timerId = setTimeout(() => {
        setEditing(!editing);
      }, 3500);
    } else {
      clearTimeout(timerId);
    }
  }, [startLongPress]);

  // useEffect to set focus for editing
  useEffect(() => {
    if (editing && titleField.current) {
      titleField.current.focus();
    }
  }, [editing]);

  // useEffect to set complete for all items
  useEffect(() => {
    if (completedAll === true) {
      setCompleted(true);

      const updatedTodos = todos.map(upTodo => (
        { ...upTodo, complete: completedAll }
      ));

      setTodos(updatedTodos);
    }

    if (completedAll === false) {
      setCompleted(false);

      const updatedTodos = todos.map(upTodo => (
        { ...upTodo, complete: completedAll }
      ));

      setTodos(updatedTodos);
    }
  }, [completedAll]);

  // useEffect for cotrol state allCompleted
  useEffect(() => {
    const allCompleted = todos.every(item => item.complete === true);

    if (allCompleted) {
      setCompletedAll(true);
    }

    if (!completed) {
      setCompletedAll(null);
    }
  }, [completed]);

  return (
    <li className={cn({ completed, editing })}>
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCheckbox}
        />
        <label
          onDoubleClick={handleEdit}
          onTouchStart={() => setStartLongPress(true)}
          onTouchEnd={() => setStartLongPress(false)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={applyRemoveTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={titleField}
        value={title}
        onChange={handleEditTitle}
        onBlur={applyEditing}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
});
