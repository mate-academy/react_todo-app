import Filters from '../Filters/Filters';

type Props = {
  activeTodos: number;
  completedTodos: number;
  removeAllCompleted: () => void;
};

const Footer: React.FC<Props> = ({
  activeTodos,
  completedTodos,
  removeAllCompleted,
}) => (
  <footer className="footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${activeTodos} ${activeTodos === 1 ? 'item' : 'items'} left`}
    </span>

    <Filters />

    {!!completedTodos && (
      <button
        type="button"
        className="clear-completed"
        onClick={removeAllCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);

export default Footer;
