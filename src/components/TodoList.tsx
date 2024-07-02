import { useContext } from 'react';
import { StateContext, DispatchContext } from '../store';
import cn from 'classnames';
import { SortTodos } from '../types/type';

export const TodoList: React.FC = () => {
  const { todos, sortTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const filteredTodos = todos.filter(todo => {
    switch (sortTodos) {
      case SortTodos.Active:
        return !todo.completed;
      case SortTodos.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(({ id, completed, changed, title }) => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed })}
          key={id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => dispatch({ type: 'checked', id })}
            />
          </label>

          {!changed && (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => dispatch({ type: 'setChanged', id })}
            >
              {title}
            </span>
          )}

          {changed && (
            <form
              onSubmit={e => {
                e.preventDefault();
                dispatch({ type: 'setChanged', id });
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={title}
                autoFocus
                onKeyUp={e => {
                  if (e.key === 'Escape') {
                    dispatch({ type: 'cancelChangingTodo', id });
                    dispatch({ type: 'setChanged', id });
                  }
                }}
                onChange={e => {
                  dispatch({
                    type: 'changed',
                    id,
                    title: e.target.value,
                  });
                }}
                onBlur={() => dispatch({ type: 'setChanged', id })}
              />
            </form>
          )}

          {!changed && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => dispatch({ type: 'remove', id })}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
