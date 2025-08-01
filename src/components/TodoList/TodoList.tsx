/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useRef, useEffect } from 'react';
import { useTodos } from '../../contexts/TodosContext';
import '../../styles/todo-list.scss';

export const TodoList: React.FC = () => {
  const { todos, filter, updateTodoData, deleteTodos } = useTodos();
  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState('');

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodoId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTodoId]);

  function handleSubmit(todoID: number, newTitle: string) {
    if (newTitle) {
      updateTodoData(todoID, { title: newTitle });
    } else {
      deleteTodos([todoID]);
    }

    setEditingTodoId(null);
    setEditingTodoTitle('');
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={todo.completed ? 'todo completed' : 'todo'}
          key={todo.id}
        >
          {/* Статус завжди показується */}
          <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
            <input
              id={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() =>
                updateTodoData(todo.id, { completed: !todo.completed })
              }
            />
          </label>

          {todo.id === editingTodoId ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (editingTodoId !== null) {
                  handleSubmit(editingTodoId, editingTodoTitle.trim());
                }
              }}
            >
              <input
                ref={editInputRef}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editingTodoTitle}
                onChange={e => setEditingTodoTitle(e.target.value)}
                onBlur={() => {
                  if (editingTodoTitle.trim()) {
                    updateTodoData(todo.id, { title: editingTodoTitle.trim() });
                  } else {
                    deleteTodos([todo.id]);
                  }

                  setEditingTodoId(null);
                }}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setEditingTodoId(null);
                    setEditingTodoTitle(todo.title);
                  }
                }}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  setEditingTodoId(todo.id);
                  setEditingTodoTitle(todo.title);
                }}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodos([todo.id])}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
