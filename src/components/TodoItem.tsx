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
    isCompletedAll,
    setIsCompletedAll,
  } = useContext(TodosContext);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.complete);
  const [startLongPress, setStartLongPress] = useState(false);
  const [blur, setBlur] = useState(true);
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
    setBlur(false);
    setIsEditing(true);
  };

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
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

    setIsEditing(!isEditing);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setBlur(true);
    }

    if (event.key === 'Enter' && title.length === 0) {
      applyRemoveTodo();
    }

    if (event.key === 'Escape') {
      setTitle(todo.title);
      setBlur(true);
    }
  };

  useEffect(() => {
    if (blur) {
      titleField.current?.blur();
    }
  }, [blur]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (startLongPress) {
      timerId = setTimeout(() => {
        setIsEditing(!isEditing);
      }, 1000);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  useEffect(() => {
    if (isEditing && titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isCompletedAll) {
      setCompleted(true);

      const updatedTodos = todos.map(upTodo => (
        { ...upTodo, complete: isCompletedAll }
      ));

      setTodos(updatedTodos);
    }

    if (isCompletedAll === false) {
      setCompleted(false);

      const updatedTodos = todos.map(upTodo => (
        { ...upTodo, complete: isCompletedAll }
      ));

      setTodos(updatedTodos);
    }
  }, [isCompletedAll]);

  useEffect(() => {
    const allCompleted = todos.every(item => item.complete);

    if (allCompleted) {
      setIsCompletedAll(true);
    }

    if (!completed) {
      setIsCompletedAll(null);
    }
  }, [completed]);

  return (
    <li className={cn({ completed, isEditing })}>
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
