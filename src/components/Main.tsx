import { useContext } from 'react';
import { TodoList } from './TodoList';
import { DispatchContext, StateContext } from './TodosContext';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const Main = () => {
  const { todos, filterBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isAllCompleted = todos.every(todo => todo.completed);

  const handleChangeAllCompleted = () => {
    dispatch({
      type: 'changeAllCompleted',
      payload: isAllCompleted,
    });
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
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isAllCompleted}
        onChange={handleChangeAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={filteredTodos} />
    </section>
  );
};
