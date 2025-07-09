import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodoStatus } from '../types/TodoStatus';
import { useGlobalDispatch, useGlobalState } from '../hooks/useGlobal';
import { deleteTodo } from '../api/todos';

type TodoFooterProps = {
  removeTodo: (todo: Todo) => void;
};

export const TodoFooter: React.FC<TodoFooterProps> = () => {
  const { todos, selectedFilterStatus } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const notCompletedTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.filter(todo => todo.completed === true);
  const filterTypes = Object.values(TodoStatus);

  const deleteCompleted = async () => {
    const results = await Promise.allSettled(
      completedTodos.map(todo => deleteTodo(todo.id)),
    );
    const successfullyDeletedIds = completedTodos
      .filter((_, index) => results[index].status === 'fulfilled')
      .map(todo => todo.id);

    dispatch({
      type: 'removeCompletedTodos',
      payload: successfullyDeletedIds,
    });

    const hasAnyError = results.some(result => result.status === 'rejected');

    if (hasAnyError) {
      dispatch({ type: 'setDeleteError', payload: false });
      setTimeout(() => {
        dispatch({ type: 'setDeleteError', payload: true });
      }, 0);
    }
  };

  return (
    /* Hide the footer if there are no todos */
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterTypes.map((filterType, index) => (
          <a
            href="#/"
            key={index}
            className={classNames('filter__link', {
              selected: selectedFilterStatus === filterType,
            })}
            data-cy={`FilterLink${filterType}`}
            onClick={() => {
              dispatch({
                type: 'setSelectedFilterStatus',
                payload: filterType,
              });
            }}
          >
            {filterType}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={async () => {
          deleteCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
