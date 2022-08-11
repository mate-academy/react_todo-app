import { FC } from 'react';
import { Todo } from '../../type';
import { ComplitedFilter } from '../ComplitedFilter';

interface Props {
  todos: Todo[]
  DeleteAll: () => void
}

export const TodoFilter: FC<Props> = ({ todos, DeleteAll }) => {
  const ToDosNotCompleted = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${ToDosNotCompleted.length} items left`}
      </span>

      <ComplitedFilter />

      { todos.some(todo => todo.completed)
    && (
      <button
        type="button"
        className="clear-completed"
        onClick={() => DeleteAll()}
      >
        Clear completed
      </button>
    )}
    </footer>
  );
};
