import { useContext, useRef, useState } from 'react';
import cn from 'classnames';
import { TabsContext } from '../Context/TabsContext';

export default function TodoApp() {
  const { visibleTodos, toggleTodo, deleteTodo, updateTodo } =
    useContext(TabsContext);

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Pomaga odróżnić anulowanie edycji od zwykłego opuszczenia inputa.
  const skipNextBlur = useRef(false);

  const saveTodo = (id: number) => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(id);
    } else {
      updateTodo(id, trimmedTitle);
    }

    setEditingTodoId(null);
    setEditTitle('');
  };

  const cancelEditing = () => {
    skipNextBlur.current = true;
    setEditingTodoId(null);
    setEditTitle('');
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed,
          })}
          key={todo.id}
        >
          <div className="todo__status-label">
            <input
              id={`todo-status-${todo.id}`}
              aria-label={`Change status of ${todo.title}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
          </div>

          {editingTodoId === todo.id ? (
            <form
              onSubmit={event => {
                event.preventDefault();
                saveTodo(todo.id);
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editTitle}
                onChange={event => setEditTitle(event.target.value)}
                onBlur={() => {
                  if (skipNextBlur.current) {
                    skipNextBlur.current = false;

                    return;
                  }

                  saveTodo(todo.id);
                }}
                onKeyUp={event => {
                  if (event.key === 'Escape') {
                    cancelEditing();
                  }
                }}
                autoFocus
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  skipNextBlur.current = false;
                  setEditingTodoId(todo.id);
                  setEditTitle(todo.title);
                }}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
}
