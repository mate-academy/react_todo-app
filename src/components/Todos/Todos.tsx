import { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const Todos = () => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const renameInputRef = useRef<HTMLInputElement | null>(null);
  const { toggleTodoStatus, updateTodoTitle, deleteTodo, filteredTodos } =
    useTodoContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editingTodoId === null) {
      return;
    }

    if (editingTitle.trim() === '') {
      deleteTodo(editingTodoId);
    } else {
      updateTodoTitle(editingTodoId, editingTitle);
    }

    setEditingTodoId(null);
  };

  const handleDoubleClick = (id: number, currentTitle: string) => {
    setEditingTodoId(id);
    setEditingTitle(currentTitle);
  };

  const handleOnBlur = (event: React.FormEvent) => {
    handleSubmit(event);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && editingTodoId !== null) {
      setEditingTodoId(null);
    }
  };

  useEffect(() => {
    if (editingTodoId !== null && renameInputRef.current) {
      renameInputRef.current.focus();
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filteredTodos.map(({ id, completed, title }) => (
        <div
          key={id}
          data-cy="Todo"
          className={`todo ${completed ? 'completed' : ''}`}
        >
          {editingTodoId === id ? (
            <>
              {/* This todo is being edited */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={completed}
                  onChange={() => toggleTodoStatus(id)}
                />
              </label>

              {/* This form is shown instead of the title and remove button */}
              <form onSubmit={handleSubmit}>
                <input
                  data-cy="TodoTitleField"
                  ref={renameInputRef}
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                  onBlur={handleOnBlur}
                  onKeyUp={handleKeyUp}
                />
              </form>
            </>
          ) : (
            <TodoItem
              todo={{ id, completed, title }}
              toggleTodoStatus={toggleTodoStatus}
              deleteTodo={deleteTodo}
              handleDoubleClick={handleDoubleClick}
            />
          )}
        </div>
      ))}
    </section>
  );
};
