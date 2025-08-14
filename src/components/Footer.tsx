import classNames from 'classnames';
import { TodosContext } from '../context/context';
import { useContext } from 'react';

type Props = {
  setSelectedLink: React.Dispatch<React.SetStateAction<string>>;
  selectedLink: string;
  deleteAllCompleted: () => void;
};

const links = ['All', 'Active', 'Completed'];

export const Footer: React.FC<Props> = ({
  setSelectedLink,
  selectedLink,
  deleteAllCompleted,
}) => {
  const todos = useContext(TodosContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(x => x.completed === false).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {links.map(link => (
          <a
            href={`#/${link.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: selectedLink === link.toLowerCase(),
            })}
            data-cy={`FilterLink${link}`}
            key={link}
            onClick={() => {
              setSelectedLink(link.toLowerCase());
            }}
          >
            {link}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.filter(todo => todo.completed === true).length === 0}
        onClick={() => deleteAllCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};