/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../type/Todo';
import { useEffect, useRef, useState } from 'react';
import { useTodos } from '../context/TodoContext';

type TodoItemProps = {
  todo: Todo;
  editingId: number;
  setEditingId: React.Dispatch<React.SetStateAction<number>>;
  changeCheckbox: (todoToUpdate: Todo) => void;
  deleteTodo: (todoId: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  editingId,
  setEditingId,
  changeCheckbox,
  deleteTodo,
}) => {
  const [titleTochange, setTitleToChange] = useState('');
  const { setTodos } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);
  const { id, title, completed } = todo;

  useEffect(() => {
    if (editingId !== 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const handleEditingId = (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleTochange.trim()) {
      deleteTodo(editingId);
    }

    setTodos(currentTodos =>
      currentTodos.map(currentTodo => {
        const updatedTodo = {
          ...currentTodo,
          title: titleTochange.trim(),
        };

        return currentTodo.id === editingId ? updatedTodo : currentTodo;
      }),
    );
    setEditingId(0);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => changeCheckbox({ ...todo, completed: !completed })}
        />
      </label>
      {id === editingId ? (
        <form onSubmit={handleEditingId}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={titleTochange}
            onChange={e => {
              setTitleToChange(e.target.value);
              setEditingId(id);
            }}
            onBlur={handleEditingId}
            ref={inputRef}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditingId(id);
              setTitleToChange(title);
            }}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
