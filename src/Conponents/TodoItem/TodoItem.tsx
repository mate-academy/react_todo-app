import { useContext, useState } from 'react';
import { Todo, TodoContext } from '../../Context/Context';
import classNames from 'classnames';

export const TodoItem = () => {
  const {
    todoStatus,
    visibleTodos,
    deleteTodo,
    focusNewTodoField,
    updateTodo,
  } = useContext(TodoContext);

  const [newValue, setNewValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewValue(event.target.value);
  };

  const saveTodos = (todo: Todo) => {
    const trimmedValue = newValue.trim();

    if (trimmedValue === todo.title) {
      setEditingId(null);

      return;
    }

    updateTodo({ id: todo.id, oldTitle: todo.title, newTitle: trimmedValue });
    setEditingId(null);
  };

  const cancelation = (todo: Todo) => {
    setEditingId(null);
    setNewValue(todo.title);

    return;
  };

  const handleChangeTodo = (event: string, todo: Todo) => {
    if (event === 'Enter') {
      saveTodos(todo);
    }

    if (event === 'Escape') {
      cancelation(todo);
    }
  };

  return (
    <>
      {visibleTodos.map(todo => {
        return (
          <div
            data-cy="Todo"
            key={todo.id}
            className={classNames('todo', {
              completed: todo.completed,
            })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                onChange={() => todoStatus(todo.id)}
                checked={todo.completed}
                aria-label="Todo"
              />
            </label>

            {editingId === todo.id ? (
              <input
                type="text"
                value={newValue}
                onChange={handleAddTitle}
                className={classNames('todo__title', {
                  editingTodo: editingId === todo.id,
                })}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleChangeTodo(event.key, todo)
                }
                autoFocus
                data-cy="TodoTitleField"
                onBlur={() => saveTodos(todo)}
              />
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => {
                    setEditingId(todo.id);
                    setNewValue(todo.title);
                  }}
                >
                  {todo.title}
                </span>

                {/* Remove button appears only on hover */}

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => {
                    deleteTodo(todo.id);
                    focusNewTodoField();
                  }}
                >
                  ×
                </button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default TodoItem;

// updateTodo({ id: todo.id, oldTitle: todo.title, newTitle: newValue })
