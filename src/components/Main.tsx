import classNames from 'classnames';
import { Todo } from '../types/types';

type Props = {
  visibleTodos: Todo[];
  completedTodos: Todo[];
  todos: Todo[];
  setTodos: (prop: Todo[]) => void;
  editedValue: string;
  setEditedValue: (prop: string) => void;
  editHandler: (todo: Todo, event?: React.FormEvent) => void;
  exitEditorHandler: (todo: Todo) => void;
};

export const Main: React.FC<Props> = ({
  visibleTodos,
  completedTodos,
  todos,
  setTodos,
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
          <label
            onClick={() => {
              const clearTodos = todos.filter(
                currentTodo => currentTodo.id !== todo.id,
              );

              if (!todo.isCompleted) {
                setTodos([{ ...todo, isCompleted: true }, ...clearTodos]);
              } else {
                setTodos([{ ...todo, isCompleted: false }, ...clearTodos]);
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
              onChange={() => {}} // do nothing to fix error
            />
          </label>
          {todo.isEditing ? (
            <form
              className="todo__edit-form"
              onSubmit={event => editHandler(todo, event)}
            >
              <input
                onBlur={() => editHandler(todo)}
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
              <span
                onDoubleClick={() => {
                  if (!completedTodos.includes(todo)) {
                    const clearTodos = todos.filter(
                      currentTodo => currentTodo.id !== todo.id,
                    );

                    setTodos([...clearTodos, { ...todo, isEditing: true }]);
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
                  completedTodos.filter(
                    currentTodo => currentTodo.id !== todo.id,
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
