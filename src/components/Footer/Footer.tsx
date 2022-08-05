import { FC } from 'react';
import { Todo } from '../../type';
import { FilterByComplited } from '../FilterByComplited';

interface Props {
  todos: Todo[]
  DeleteAll: () => void
}

export const Footer: FC<Props> = ({ todos, DeleteAll }) => {
  const ToDosNotCompleted = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${ToDosNotCompleted.length} items left`}
      </span>

      <FilterByComplited />

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
