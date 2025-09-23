/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { useTodos } from '../TodosContext';
import { getFilteredTodos } from '../utils/todosFilter';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, selectedFilter } = useTodos();

  const todosToDisplay = getFilteredTodos(todos, selectedFilter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToDisplay.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
