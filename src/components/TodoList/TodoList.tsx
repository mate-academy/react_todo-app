import { DispatchContext, StateContext } from '../../Store';
import { useContext, useEffect } from 'react';
import { Todo } from '../../types/TodoList';
import classNames from 'classnames';

export const TodoList = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { todos, filterTodos } = state;
  // const [complited, setComplited] = useState(false);

  // const handleTitleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };

  useEffect(() => {
    dispatch({
      type: 'addTodo',
      payload: { id: 12, title: 'title 1', completed: false },
    });
    dispatch({
      type: 'addTodo',
      payload: { id: 13, title: 'title 2', completed: true },
    });
    dispatch({
      type: 'addTodo',
      payload: { id: 14, title: 'title 3', completed: true },
    });
    dispatch({
      type: 'addTodo',
      payload: { id: 15, title: 'title 4', completed: true },
    });
    dispatch({
      type: 'deleteAllCompleted',
    });
  }, [dispatch]);

  const deleteOneTodo = (todo: Todo) => {
    dispatch({
      type: 'deleteTodo',
      payload: { id: todo.id },
    });
  };

  const complitedTodo = (todo: Todo) => {
    dispatch({
      type: 'completed',
      payload: { id: todo.id },
    });
  };

  let list = todos;

  if (filterTodos === 'Active') {
    list = list.filter(todo => todo.completed === false);
  }

  if (filterTodos === 'Completed') {
    list = list.filter(todo => todo.completed === true);
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {list.map(
        todo => (
          <div
            data-cy="Todo"
            // className="todo completed"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => complitedTodo(todo)}
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
              onClick={() => deleteOneTodo(todo)}
            >
              ×
            </button>
          </div>
        ),

        // {/* This todo is an active todo */}
        // <div data-cy="Todo" className="todo">
        //     <label className="todo__status-label">
        //         <input
        //             data-cy="TodoStatus"
        //             type="checkbox"
        //             className="todo__status"
        //         />
        //     </label>

        //     <span data-cy="TodoTitle" className="todo__title">
        //         Not Completed Todo
        //     </span>

        //     <button type="button" className="todo__remove" data-cy="TodoDelete">
        //         ×
        //     </button>
        // </div>

        // {/* This todo is being edited */}
        // <div data-cy="Todo" className="todo">
        //     <label className="todo__status-label">
        //         <input
        //             data-cy="TodoStatus"
        //             type="checkbox"
        //             className="todo__status"
        //         />
        //     </label>

        //     {/* This form is shown instead of the title and remove button */}
        //     <form>
        //         <input
        //             data-cy="TodoTitleField"
        //             type="text"
        //             className="todo__title-field"
        //             placeholder="Empty todo will be deleted"
        //             value="Todo is being edited now"
        //         />
        //     </form>
        // </div>

        // {/* This todo is in loadind state */}
        // <div data-cy="Todo" className="todo">
        //     <label className="todo__status-label">
        //         <input
        //             data-cy="TodoStatus"
        //             type="checkbox"
        //             className="todo__status"
        //         />
        //     </label>

        //     <span data-cy="TodoTitle" className="todo__title">
        //         Todo is being saved now
        //     </span>

        //     <button type="button" className="todo__remove" data-cy="TodoDelete">
        //         ×
        //     </button>
        // </div>
      )}
    </section>
  );
};
