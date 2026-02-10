import { useContext } from 'react';
import { Filter } from '../Filter';
import { TodosContext } from '../TodosContext';

type Props = {
  setFilter: (value: string | undefined) => void;
};

export const Footer: React.FC<Props> = ({ setFilter }) => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error('TodosContext is not available');
  }

  const { todos, clearCompleted } = todosContext;
  const counter = todos
    .filter(todo => {
      return todo.completed !== true;
    })
    .filter(todo => {
      return !todo.hasOwnProperty('temp');
    });

  const completedLength = [...todos].filter(
    item => item.completed === true,
  ).length;

  const footerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    clearCompleted();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter.length} items left
      </span>

      <Filter setFilter={setFilter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedLength > 0 ? false : true}
        onClick={footerHandler}
      >
        Clear completed
      </button>
    </footer>
  );
};
