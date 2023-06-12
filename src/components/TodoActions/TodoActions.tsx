import { Filter } from '../../types/Filter';
import { Button } from '../UI/Button';
import { IconClearCompleted } from '../UI/IconClearCompleted';
import { IconToggleAll } from '../UI/IconToggleAll';
import styles from './TodoActions.module.scss';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  handleClearCompletedTodo: () => void;
  handleToggleAllTodos: () => void;
  filter: Filter;
};

export const TodoActions: React.FC<Props> = ({
  setFilter,
  handleClearCompletedTodo,
  handleToggleAllTodos,
  filter,
}) => {
  return (
    <div className={styles.action}>
      <Button
        title="Toggle all"
        onClick={handleToggleAllTodos}
      >
        <IconToggleAll />
      </Button>

      <div className={styles.filter}>
        <input
          type="radio"
          name="radio"
          value="all"
          id="tab-1"
          onChange={() => setFilter(Filter.All)}
          checked={filter === Filter.All}
        />
        <label htmlFor="tab-1">
          All
        </label>

        <input
          type="radio"
          name="radio"
          value="active"
          id="tab-2"
          onChange={() => setFilter(Filter.Active)}
          checked={filter === Filter.Active}
        />
        <label htmlFor="tab-2">
          Active
        </label>

        <input
          type="radio"
          name="radio"
          value="completed"
          id="tab-3"
          onChange={() => setFilter(Filter.Completed)}
          checked={filter === Filter.Completed}
        />
        <label htmlFor="tab-3">
          Completed
        </label>
        <div className={styles.segmented} />
      </div>

      <Button
        title="Clear completed"
        onClick={handleClearCompletedTodo}
      >
        <IconClearCompleted />
      </Button>
    </div>
  );
};
