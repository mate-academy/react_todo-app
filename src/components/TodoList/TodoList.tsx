import { ChangeEvent, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  removeTodo = () => {},
  updateTodo = () => {},
}) => {
  const [isEdit, setIsEdit] = useState({ id: 0, title: '' });

  const handleDoubleClick = (todo: Todo) => {
    setIsEdit({ id: todo.id, title: todo.title });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit({ ...isEdit, title: event.target.value });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedTitle = isEdit.title.trim();

      if (trimmedTitle) {
        updateTodo(isEdit.id, trimmedTitle);
      } else {
        removeTodo(isEdit.id);
      }

      setIsEdit({ id: 0, title: '' });
    }
  };

  const handleBlur = () => {
    const trimmedTitle = isEdit.title.trim();

    if (trimmedTitle) {
      updateTodo(isEdit.id, trimmedTitle);
    } else {
      removeTodo(isEdit.id);
    }

    setIsEdit({ id: 0, title: '' });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          {isEdit.id === todo.id ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={isEdit.title}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                autoFocus
              />
            </form>
          ) : (
            <>
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
              </label>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleDoubleClick(todo)}
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => removeTodo(todo.id)}
              >
                x
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
