import { TodoCard } from '../TodoCard/TodoCard';

import TodosContext from '../../contexts/Todos/TodosContext';
import FilterContext from '../../contexts/Filter/FilterContext';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

export const TodoList = () => {
  const { todos } = TodosContext.useState();
  const { filter } = FilterContext.useState();

  const todosToDisplay = getFilteredTodos(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToDisplay.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
