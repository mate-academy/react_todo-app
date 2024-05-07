import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => (
        <div data-cy="Todo" className="todo completed" key={todo.id}>
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            x
          </button>
        </div>
      ))}

      {/* This todo is in loadind state */}
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Todo is being saved now
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          x
        </button>
      </div>
    </section>
  );
};

//This todo is an active todo */
/* <div data-cy="Todo" className="todo">
<label className="todo__status-label">
  <input
    data-cy="TodoStatus"
    type="checkbox"
    className="todo__status"
  />
</label>

<span data-cy="TodoTitle" className="todo__title">
  Not Completed Todo
</span>

<button type="button" className="todo__remove" data-cy="TodoDelete">
  x
</button>
</div> */
//}

// This todo is being edited
// <div data-cy="Todo" className="todo">
// <label className="todo__status-label">
//   <input
//     data-cy="TodoStatus"
//     type="checkbox"
//     className="todo__status"
//   />
// </label>

// {/* This form is shown instead of the title and remove button */}
// <form>
//   <input
//     data-cy="TodoTitleField"
//     type="text"
//     className="todo__title-field"
//     placeholder="Empty todo will be deleted"
//     value="Todo is being edited now"
//   />
// </form>
// </div>
