import { useContext } from 'react';
import { Status } from '../../types';
import { TodoContext } from '../../context/TodoContextProvider';
import cn from 'classnames';

interface Props {
  status: Status;
}

export default function FilterLink({ status }: Props) {
  const { currentStatus, setCurrentStatus } = useContext(TodoContext);

  return (
    <a
      href={cn({
        '#/': status === Status.ALL,
        '#/active': status === Status.ACTIVE,
        '#/completed': status === Status.COMPLETED,
      })}
      data-cy={'FilterLink' + status}
      className={cn('filter__link', {
        selected: currentStatus === status,
      })}
      onClick={() => setCurrentStatus(status)}
    >
      {status}
    </a>
  );
}
