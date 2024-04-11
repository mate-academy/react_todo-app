import classNames from 'classnames';
import { Todo } from '../types/types';

type Props = {
  visibleTodos: Todo[];
  completedTodos: Todo[];
  todos: Todo[];
  setTodos: (prop: Todo[]) => void;
  setCompletedTodos: (prop: Todo[]) => void;
  editedValue: string;
  setEditedValue: (prop: string) => void;
  editHandler: (event: React.FormEvent, todo: Todo) => void;
  exitEditorHandler: (todo: Todo) => void;
};

export const Main: React.FC<Props> = ({
  visibleTodos,
  completedTodos,
  todos,
  setTodos,
  setCompletedTodos,
  editedValue,
  setEditedValue,
  exitEditorHandler,
  editHandler,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', {
            completed: completedTodos.includes(todo),
          })}
        >
          {todo.isEditing ? (
            <form
              className="todo__edit-form"
              onSubmit={event => editHandler(event, todo)}
            >
              <input
                onBlur={() => exitEditorHandler(todo)}
                onKeyDown={event => {
                  if (event.key === 'ArrowUp' || event.key === 'Escape') {
                    exitEditorHandler(todo);
                  }
                }}
                onChange={event => setEditedValue(event.target.value)}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                autoFocus
                value={editedValue}
              />
            </form>
          ) : (
            <>
              <label
                onClick={() => {
                  if (!completedTodos.includes(todo)) {
                    setCompletedTodos([...completedTodos, todo]);
                  }
                }}
                htmlFor="#form-input"
                className="todo__status-label"
              >
                <input
                  id="form-input"
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={completedTodos.includes(todo)}
                />
              </label>
              <span
                onDoubleClick={() => {
                  if (!completedTodos.includes(todo)) {
                    // eslint-disable-next-line no-param-reassign
                    todo.isEditing = true;
                    setEditedValue(todo.title);
                  }
                }}
                data-cy="TodoTitle"
                className="todo__title"
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  setTodos(
                    todos.filter(currentTodo => currentTodo.id !== todo.id),
                  );
                  setCompletedTodos(
                    completedTodos.filter(
                      currentTodo => currentTodo.id !== todo.id,
                    ),
                  );
                }}
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
