import { useContext } from 'react';
import { TodoList } from './TodoList';
import { DispatchContext, StateContext } from './TodosContext';

export const Main = () => {
  const { todos, filterBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const filterTodos = () => {
    switch (filterBy) {
      case 'all':
        return todos;

      case 'active':
        return todos.filter(todo => todo.completed === false);

      case 'completed':
        return todos.filter(todo => todo.completed === true);

      default: return todos;
    }
  };

  const filteredTodos = filterTodos();

  const handelChangeAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);

    dispatch({
      type: 'changeAllCompleted',
      payload: !allCompleted,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handelChangeAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={filteredTodos} />
    </section>
  );
};
