import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { todos, setTodos, setChecked } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.title);
  const [shouldEdit, setShouldEdit] = useState(false);
  const [focus, setFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckedTodo = (todoId: number) => {
    const newTodos = todos.map(currentTodo => (
      currentTodo.id === todoId
        ? { ...currentTodo, completed: !currentTodo.completed }
        : currentTodo));

    setTodos(newTodos);
    setChecked(newTodos.every(currentTodo => currentTodo.completed));
  };

  const deleteTodo = (selectedTodo: Todo): void => {
    const filteredTodos = todos.filter(t => t !== selectedTodo);

    setTodos([...filteredTodos]);
  };

  const handleDoubleClick = useCallback(() => {
    setShouldEdit(true);
    setFocus(true);
  }, [shouldEdit]);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const handleBlur = () => {
    setShouldEdit(false);
    setFocus(false);

    if (!title.trim()) {
      deleteTodo(todo);

      return;
    }

    setTodos(todos.map(item => {
      return item.id !== todo.id ? item : { ...todo, title: title.trim() };
    }));

    setTitle(title.trim());
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setShouldEdit(false);
      setFocus(false);

      return;
    }

    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames({
        completed: todo.completed,
        editing: shouldEdit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleCheckedTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>
          {title}
        </label>

        <button
          type="button"
          aria-label="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo)}
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit no-outline"
        value={title}
        onChange={(event) => setTitle(event?.target.value)}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
});
