import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useTodo();

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
      >
        ×
      </button>
    </div>

    // {/* This todo is an active todo */}
    // <div data-cy="Todo" className="todo">
    //   <label className="todo__status-label">
    //     <input
    //       data-cy="TodoStatus"
    //       type="checkbox"
    //       className="todo__status"
    //     />
    //   </label>

    //   <span data-cy="TodoTitle" className="todo__title">
    //     Not Completed Todo
    //   </span>

    //   <button type="button" className="todo__remove" data-cy="TodoDelete">
    //     ×
    //   </button>
    // </div>

    // {/* This todo is being edited */}
    // <div data-cy="Todo" className="todo">
    //   <label className="todo__status-label">
    //     <input
    //       data-cy="TodoStatus"
    //       type="checkbox"
    //       className="todo__status"
    //     />
    //   </label>

    //   {/* This form is shown instead of the title and remove button */}
    //   <form>
    //     <input
    //       data-cy="TodoTitleField"
    //       type="text"
    //       className="todo__title-field"
    //       placeholder="Empty todo will be deleted"
    //       value="Todo is being edited now"
    //     />
    //   </form>
    // </div>

    // {/* This todo is in loadind state */}
    // <div data-cy="Todo" className="todo">
    //   <label className="todo__status-label">
    //     <input
    //       data-cy="TodoStatus"
    //       type="checkbox"
    //       className="todo__status"
    //     />
    //   </label>

    //   <span data-cy="TodoTitle" className="todo__title">
    //     Todo is being saved now
    //   </span>

    //   <button type="button" className="todo__remove" data-cy="TodoDelete">
    //     ×
    //   </button>
    // </div>
  );
};
