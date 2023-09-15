import { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext';
import { ActionType } from '../../types/Action';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { id, title, completed } = item;
  const { dispatch } = useContext(TodosContext);

  const handleChekBoxChange = () => {
    dispatch({ type: ActionType.ChangeCompleted, payload: id });
  };

  return (
    <li className={classNames({
      completed,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle"
          checked={completed}
          onChange={handleChekBoxChange}
        />
        <label htmlFor="toggle">
          {title}
        </label>
        <button
          aria-label="deleteTodo"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      {/* <input type="text" className="edit" /> */}
    </li>
  );
};
