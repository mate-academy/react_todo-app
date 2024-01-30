import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { DispatchContext, StateContext } from '../Store';
import { ActionType, TodoFilterType } from '../utils/enums';

export const TodoList = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, todofilter } = useContext(StateContext);

  const filteredTodos = todos.filter(todo => {
    switch (todofilter) {
      case TodoFilterType.Active:
        return !todo.completed;

      case TodoFilterType.Completed:
        return todo.completed;

      case TodoFilterType.All:
        return true;

      default:
        return true;
    }
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
