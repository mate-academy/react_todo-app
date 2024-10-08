import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  toggleTodoStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
  handleDoubleClick: (id: number, currentTitle: string) => void;
};

export const TodoItem = ({
  todo,
  toggleTodoStatus,
  deleteTodo,
  handleDoubleClick,
}: Props) => {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
        <input
          data-cy="TodoStatus"
          id={`todo-${todo.id}`}
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodoStatus(todo.id)}
        />
      </label>

      <span
        data-cy="TodoTitle"
        className="todo__title"
        onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
      >
        {todo.title}
      </span>
      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>
    </>
  );
};
