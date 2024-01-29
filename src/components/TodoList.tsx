/* eslint-disable default-case */
import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { DispatchContext, StateContext } from '../Store';
import { ActionType, FilterForTodos } from '../utils/enums';

export const TodoList = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, todofilter } = useContext(StateContext);

  const filteredTodos = todos.filter(todo => {
    switch (todofilter) {
      case FilterForTodos.Active:
        return !todo.completed;

      case FilterForTodos.Completed:
        return todo.completed;

      case FilterForTodos.All:
        return true;
    }

    return true;
  });

  function handleToggleAll() {
    dispatch({ type: ActionType.ToggleAll });
  }

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleToggleAll}
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>

      <ul className="todo-list" data-cy="todosList">
        {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </section>
  );
};
