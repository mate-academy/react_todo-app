import { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../context/Store';

export const TodoList = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [editTitle, setEditTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const handleEditTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle) {
      dispatch({ type: 'editTodo', payload: { id, title: trimmedTitle } });
    } else {
      dispatch({ type: 'delete', payload: id });
    }

    setEditTitle('');
    setEditingTodoId(null);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditingTodoId(null);
      setEditTitle('');
    }
  };

  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

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
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: 'markCompleted', payload: todo.id })
              }
            />
          </label>

          {editingTodoId === todo.id ? (
            <form onSubmit={e => handleEditTodo(e, todo.id)}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                onBlur={e => handleEditTodo(e, todo.id)}
                onKeyUp={e => handleKeyUp(e)}
                autoFocus
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setEditingTodoId(todo.id);
                setEditTitle(todo.title);
              }}
            >
              {todo.title}
            </span>
          )}

          {!editingTodoId && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => dispatch({ type: 'delete', payload: todo.id })}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
