import classNames from 'classnames';
import { Status } from '../types/Status';

type Props = {
  todoStatus: Status,
  setTodoStatus: React.Dispatch<React.SetStateAction<Status>>,
};

export const TodosFilter: React.FC<Props> = ({ todoStatus, setTodoStatus }) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: todoStatus === Status.ALL,
          })}
          onClick={(event) => {
            event.preventDefault();
            setTodoStatus(Status.ALL);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: todoStatus === Status.ACTIVE,
          })}
          onClick={(event) => {
            event.preventDefault();
            setTodoStatus(Status.ACTIVE);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: todoStatus === Status.COMPLETED,
          })}
          onClick={(event) => {
            event.preventDefault();
            setTodoStatus(Status.COMPLETED);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
