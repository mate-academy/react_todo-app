import React from 'react';
import { Todo } from '../types/Todo';
import { Action } from './TodoProvider';

type Props = {
  filteredTodos: Todo[];
  changeCompletedStatus: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  dispatch: React.Dispatch<Action>;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  changeCompletedStatus,
  deleteTodo,
  dispatch,
}) => {
  const [editingTodo, setEditingTodo] = React.useState<number | null>(null);
  const [editingTitle, setEditingTitle] = React.useState('');

  const handleSubmit = (e: React.FormEvent | React.FocusEvent, todo: Todo) => {
    e.preventDefault();

    const trimmedTitle = editingTitle.trim();

    if (trimmedTitle === todo.title) {
      setEditingTodo(null);

      return;
    }

    if (trimmedTitle.length !== 0) {
      dispatch({
        type: 'EDIT',
        payload: { id: todo.id, title: trimmedTitle },
      });
    } else {
      deleteTodo(todo);
    }

    setEditingTodo(null);
  };

  const handleKeyUp = (e: React.KeyboardEvent, todo: Todo) => {
    if (e.key === 'Escape') {
      setEditingTodo(null);
      setEditingTitle(todo.title);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={todo.completed ? 'todo completed' : 'todo'}
        >
          <label className="todo__status-label">
            <input
              id={`todo-status-${todo.id}`} // Додаємо унікальний ID
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => changeCompletedStatus(todo)}
            />
            {/* Можна додати порожній span або htmlFor до label, якщо помилка не зникне */}
          </label>

          {editingTodo !== todo.id ? (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setEditingTodo(todo.id);
                setEditingTitle(todo.title);
              }}
            >
              {todo.title}
            </span>
          ) : (
            <form onSubmit={e => handleSubmit(e, todo)}>
              <input
                data-cy="TodoTitleField"
                type="text"
                autoFocus
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editingTitle}
                onKeyUp={e => handleKeyUp(e, todo)}
                onChange={e => setEditingTitle(e.target.value)}
                onBlur={e => handleSubmit(e, todo)}
              />
            </form>
          )}

          {editingTodo !== todo.id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(todo)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
