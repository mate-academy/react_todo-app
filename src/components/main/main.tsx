import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { DispatchContext, TodosContext } from '../../Store';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const Main: React.FC = () => {
  const { todos, filterBy } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const allCompleted = todos.every(todo => todo.completed);

  const [toggleAll, setToggleAll] = React.useState(false);

  const handleToggleAll = () => {
    dispatch({
      type: 'setToggleAll',
      payload: allCompleted,
    });
    setToggleAll(!toggleAll);
  };

  const filterTodos = (allTodos: Todo[]): Todo[] => {
    switch (filterBy) {
      case Status.COMPLETED:
        return allTodos.filter(todo => todo.completed);
      case Status.ACTIVE:
        return allTodos.filter(todo => !todo.completed);
      default:
        return allTodos;
    }
  };

  const filteredTodos = filterTodos(todos);

  return (
    <section className="main" data-cy="todosList">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allCompleted}
        onChange={handleToggleAll}
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>

      <TodoList filteredTodos={filteredTodos} />
    </section>
  );
};
