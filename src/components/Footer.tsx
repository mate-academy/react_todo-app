import { SelectedFilter } from '../types/SelectedFilter';
import { FilterOptions } from './FilterOption';
import { useGlobalDispatch, useGlobalState } from '../Store';

export const Footer = () => {
  const { todos } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const filteredOptions = [
    { type: SelectedFilter.ALL, href: '#/', data: 'FilterLinkAll' },

    { type: SelectedFilter.ACTIVE, href: '#/active', data: 'FilterLinkActive' },

    {
      type: SelectedFilter.COMPLETED,
      href: '#/completed',
      data: 'FilterLinkCompleted',
    },
  ];

  const handleMassDeleteTodo = (ids: number[]) => {
    dispatch({ type: 'massDelete', payload: ids });
  };

  const itemsLeft = () => {
    const uncompletedTodos = todos.filter(todo => !todo.completed).length;

    if (uncompletedTodos === 1) {
      return `${uncompletedTodos} item left`;
    }

    return `${uncompletedTodos} items left`;
  };

  const completedTodosIds = todos
    .filter(todo => todo.completed)
    .map(todo => todo.id);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft()}
      </span>

      <nav className="filter" data-cy="Filter">
        {filteredOptions.map(option => (
          <FilterOptions key={option.type} option={option} />
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => handleMassDeleteTodo(completedTodosIds)}
        disabled={!completedTodosIds.length}
        style={{
          visibility: !completedTodosIds.length ? 'hidden' : 'visible',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
