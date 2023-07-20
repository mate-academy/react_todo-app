import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import '../../styles/todoItem.scss';
import { deleteTodo } from '../../api/todos';

type TodoItemProps = {
  todo: Todo;
  onDelete:(id: number) => void;
  onUpdate:(id: number, completed: boolean) => void;
  updateTodo: (id: number, data: object) => Promise<unknown>;
  todoEdit: (id: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onUpdate,
  updateTodo,
  todoEdit,
}) => {
  const [doubleClick, setDoubleClick] = useState(false);
  const [activeTitle, setActiveTitle] = useState(todo.title);

  const keyKlick = (
    e:React.KeyboardEvent<HTMLInputElement>,
    title:string,
    id:number,
  ) => {
    if (e.key === 'Enter') {
      if (title.length > 0) {
        updateTodo(todo.id, { title });
        setDoubleClick(false);
      } else {
        deleteTodo(id);
        todoEdit(id);
      }
    }

    if (e.key === 'Escape') {
      setActiveTitle(todo.title);
      setDoubleClick(false);
    }
  };

  return (
    <div
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onUpdate(todo.id, todo.completed)}
        />
      </label>

      {doubleClick ? (
        <form onSubmit={e => e.preventDefault()}>
          <input
            className="todo__title-field"
            type="text"
            value={activeTitle}
            onChange={(e) => setActiveTitle(e.target.value)}
            onBlur={(e) => {
              updateTodo(todo.id, { title: e.target.value });
              setDoubleClick(false);
            }}
            onKeyDown={e => keyKlick(e, activeTitle, todo.id)}
            // eslint-disable-next-line
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setDoubleClick(true)}
          >
            {activeTitle}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}

      {/* <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div> */}
    </div>
  );
};
