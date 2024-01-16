import { useContext } from 'react';
import { DispatchContext, TodosContext } from '../../state/State';
import './Footer.scss';
import { Filters } from '../Filters/Filters';

export const Footer = () => {
  const { todosCounter, isCompleted } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  return (
    <footer className="footer">
      <span className="footer__todo-count" data-cy="todosCounter">
        {`${todosCounter} items left`}
      </span>

      <Filters />

      {isCompleted && (
        <button
          type="button"
          className="footer__clear-completed"
          onClick={() => dispatch({ type: 'clearCompleted' })}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
