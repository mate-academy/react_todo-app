import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { TodoListContext } from '../../context/TodoListContext';
import { TodoItemProps } from '../../types/TodoItem';

import cn from 'classnames';

export const TodoItem: React.FC<TodoItemProps> = ({
  item,
  handlerCurrentTodoId,
  currentTodoId,
}) => {
  const { id, title, completed } = item;
  const { deleteTask, editTask, completeTask, getFilter, currentFilter } = useContext(TodoListContext);
  const [newTodo, setNewTodo] = useState(title);

  const handlerNewTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handlerUpdateTask = () => {
    if (newTodo.trim()) {
      editTask(id, newTodo);
    } else {
      deleteTask(id);
    }
  };

  const handlerOnBlur = () => {
    handlerCurrentTodoId(null);
    handlerUpdateTask();
  };

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    handlerUpdateTask();

    handlerCurrentTodoId(null);
  };

  document.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      handlerCurrentTodoId(null);
    }
  });

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          onClick={() => {
            completeTask(id)
            getFilter(currentFilter);

          }}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
        />
      </label>

      {currentTodoId === id ? (
        <form onSubmit={handlerSubmit}>
          <input
            onBlur={handlerOnBlur}
            onChange={handlerNewTodo}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            defaultValue={title}
          />
        </form>
      ) : (
        <span
          onDoubleClick={() => handlerCurrentTodoId(id)}
          data-cy="TodoTitle"
          className="todo__title"
        >
          {title}
        </span>
      )}

      {currentTodoId !== id && (
        <button
          onClick={() => deleteTask(id)}
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
        >
          ×
        </button>
      )}
    </div>
  );
};
