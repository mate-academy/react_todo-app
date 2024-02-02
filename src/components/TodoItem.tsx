import React, { useCallback, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../providers/TodosProvider';
import { normalizeSpaces } from '../utils/normalize';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
}) => {
  const { todos, setTodos } = useContext(TodosContext);

  const [isEdidting, setIsEditing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(todo.title);

  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdidting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdidting]);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(wantedTodo => wantedTodo.id !== id));
  }, [setTodos]);

  const updateTodoTitle = useCallback((id: number, title: string) => {
    const updatedTodoIndex = todos
      .findIndex(wantedTodo => wantedTodo.id === id);

    const updatedTodos = [...todos];

    updatedTodos[updatedTodoIndex] = {
      ...todos[updatedTodoIndex],
      title,
    };

    setTodos(updatedTodos);
  }, [todos, setTodos]);

  const handleUpdateTitle = useCallback(() => {
    if (newTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    const normalizedTitle = normalizeSpaces(newTitle);

    setNewTitle(normalizedTitle);

    if (!normalizedTitle) {
      deleteTodo(todo.id);
    } else if (normalizedTitle === todo.title) {
      setIsEditing(false);

      return;
    } else {
      updateTodoTitle(todo.id, normalizedTitle);
    }

    setIsEditing(false);
  }, [todo.id, todo.title, newTitle, updateTodoTitle, deleteTodo]);

  const handleSubmitUpdate = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      handleUpdateTitle();
    }, [handleUpdateTitle],
  );

  const completeTodo = useCallback((id: number) => {
    const updatedTodoIndex = todos
      .findIndex(wantedTodo => wantedTodo.id === id);

    const updatedTodos = [...todos];

    updatedTodos[updatedTodoIndex] = {
      ...todos[updatedTodoIndex],
      completed: !todos[updatedTodoIndex].completed,
    };

    setTodos(updatedTodos);
  }, [setTodos, todos]);

  const handleCancelUpdate = useCallback(() => {
    setNewTitle(todo.title);
    setIsEditing(false);
  }, [todo.title]);

  return (
    <li
      className={classNames({
        completed: todo.completed && !isEdidting,
        editing: isEdidting,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle"
          onChange={() => completeTodo(todo.id)}
          checked={todo.completed}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <form onSubmit={handleSubmitUpdate}>
        <input
          ref={inputRef}
          type="text"
          className="edit"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleUpdateTitle}
          onKeyUp={(e) => {
            if (e.key === 'Escape') {
              handleCancelUpdate();
            }
          }}
        />
      </form>
    </li>
  );
});
