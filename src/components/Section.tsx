import React from 'react';
import { Todo } from '../types/Todo';
import { todoContext } from './todoContext';

type Props = {
  filteredTodos: Todo[];
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  editingTitle: string;
  setEditingTitle: React.Dispatch<React.SetStateAction<string>>;
  focusInput: () => void;
};

export const Section: React.FC<Props> = ({
  filteredTodos,
  editingId,
  setEditingId,
  editingTitle,
  setEditingTitle,
  focusInput,
}) => {
  const { todos, setTodos } = React.useContext(todoContext)!;

  const updateMark = (id: number, completed: boolean) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo,
    );

    setTodos(updatedTodos);
  };

  const updateOnBlur = (id: number, newTitle: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    setTimeout(() => {
      focusInput();
    }, 0);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              aria-label="Mark todo"
              checked={todo.completed}
              onChange={() => {
                updateMark(todo.id, !todo.completed);
              }}
            />
          </label>

          {editingId === todo.id ? (
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              value={editingTitle}
              autoFocus
              onChange={e => setEditingTitle(e.target.value)}
              onBlur={() => {
                const trimmed = editingTitle.trim();

                if (trimmed) {
                  updateOnBlur(todo.id, trimmed);
                } else {
                  deleteTodo(todo.id);
                }

                setEditingId(null);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  (e.target as HTMLInputElement).blur();
                } else if (e.key === 'Escape') {
                  setEditingId(null);
                }
              }}
            />
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setEditingId(todo.id);
                setEditingTitle(todo.title);
              }}
            >
              {todo.title}
            </span>
          )}

          {editingId !== todo.id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
