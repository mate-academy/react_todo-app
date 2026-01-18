import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTodos } from '../../../../hooks/useTodos';
import { Todo } from '../../../../types/Todo';

interface TodoItemProps {
  visibleTodos: Todo[];
}

export const TodoItem: React.FC<TodoItemProps> = ({ visibleTodos }) => {
  const { todos, setTodos, focusHeaderInput } = useTodos();
  const [editing, setEditing] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing === null) {
      return;
    }

    inputRef.current?.focus();
  }, [editing]);

  const toggleCompleted = (todoId: number, checked: boolean) => {
    setTodos(
      todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: checked } : todo,
      ),
    );
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
    focusHeaderInput();
  };

  const updateTodo = (id: number) => {
    const updatedTodo = todos.find(todo => todo.id === id);

    if (!updatedTodo) {
      return;
    }

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(id);

      return;
    }

    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );

    setEditing(null);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
  ) => {
    event.preventDefault();
    updateTodo(id);
  };

  const startEditingTodo = (todo: Todo) => {
    setEditing(todo.id);
    setNewTitle(todo.title);
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditing(null);
      setNewTitle('');
    }
  };

  return (
    <>
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={e => toggleCompleted(todo.id, e.target.checked)}
            />
          </label>
          {editing === todo.id ? (
            <form onSubmit={event => handleSubmit(event, todo.id)}>
              <input
                ref={inputRef}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTitle}
                onChange={event => setNewTitle(event.target.value)}
                onBlur={() => updateTodo(todo.id)}
                onKeyUp={event => handleEscape(event)}
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => startEditingTodo(todo)}
            >
              {todo.title}
            </span>
          )}

          {editing === null && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </>
  );
};
