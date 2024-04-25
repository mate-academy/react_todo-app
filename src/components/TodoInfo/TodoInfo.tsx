import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useState } from 'react';

type Props = {
  todo: Todo;
  onUpdate: (newTodo: Todo) => void;
  deleteTodo: (deletedTodo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({ todo, onUpdate, deleteTodo }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');

  function togelStatement() {
    const newTodo = { ...todo, completed: !todo.completed };

    onUpdate(newTodo);
  }

  function editingTodo() {
    setEditing(true);

    const newTodo = { ...todo, title: value };

    onUpdate(newTodo);
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
          onDoubleClick={editingTodo}
        >
          {todo.title}
        </span>
      ) : (
        <form>
          <input
            data-cy="EditingTodo"
            type="text"
            className="todoapp__new-todo"
            value={value}
            onChange={event => setValue(event.target.value)}
            onBlur={() => setEditing(false)}
          />
        </form>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(todo)}
      >
        ×
      </button>
    </div>
  );
};
