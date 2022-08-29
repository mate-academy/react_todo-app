import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from './TodosFilter';

type Props = {
  notCompletedTodos: number,
  deleteCompleted: () => void,
  todos: Todo[],
  filter: string,
};

export const Footer: FC<Props> = ({
  notCompletedTodos,
  deleteCompleted,
  todos,
  filter,
}) => (
  <footer className="footer">
    <span className="todo-count" data-cy="todosCounter">
      {notCompletedTodos !== 1
        ? `${notCompletedTodos} items left`
        : `${notCompletedTodos} item left`}
    </span>

    <TodosFilter filter={filter} />

    {todos.some(t => t.completed) && (
      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);
