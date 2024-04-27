import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useContext, useState } from 'react';
import { TodosContext } from '../../stor/Context';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodosContext);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const inputElement = document.getElementById('NewTodoField');

  function togelStatement() {
    const newTodo = { ...todo, completed: !todo.completed };

    updateTodo(newTodo);
  }

  function editingTodo(event: React.FormEvent) {
    event.preventDefault();

    const trimTitle = value.trim();

    if (trimTitle) {
      updateTodo({ ...todo, title: value.trim() });
    } else {
      deleteTodo(todo);
    }

    setEditing(false);
    inputElement?.focus();
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={togelStatement}
        />
      </label>

      {!editing ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </span>
      ) : (
        <form onSubmit={editingTodo}>
          <input
            autoFocus
            data-cy="EditingTodo"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.title}
            onChange={event => setValue(event.target.value)}
            onBlur={editingTodo}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                setEditing(false);
              }
            }}
          />
        </form>
      )}

      {!editing && (
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
  );
};
