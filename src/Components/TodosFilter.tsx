import React, { useContext } from 'react';
import { Todo } from '../types/TodoType';
import { TodosContext } from '../Context/TodosProvider';

interface Props {
  handleFiltering: React.Dispatch<React.SetStateAction<Todo[]>>;
}

type FilterType = 'all' | 'active' | 'completed';

export const TodosFilter: React.FC<Props> = ({ handleFiltering }) => {
  const { todos, dispatch } = useContext(TodosContext);
  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const numberOfTodos = notCompletedTodos.length;

  function filtering(type: FilterType): void {
    switch (type) {
      case 'active':
        handleFiltering(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        handleFiltering(todos.filter(todo => todo.completed));
        break;
      default:
        handleFiltering(todos);
        break;
    }
  }

  const handleClearCompleted = () => {
    dispatch({ type: 'clear-completed' });
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {numberOfTodos} items left
      </span>

      <ul className="filters">
        <li>
          <a onClick={() => filtering('all')} href="#/active">
            All
          </a>
        </li>

        <li>
          <a onClick={() => filtering('active')} href="#/active">
            Active
          </a>
        </li>

        <li>
          <a onClick={() => filtering('completed')} href="#/completed">
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        onClick={handleClearCompleted}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
