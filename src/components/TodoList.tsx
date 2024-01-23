/* eslint-disable no-console */
/* eslint-disable default-case */
import { useContext } from 'react';
import { TodoInfo } from './TodoItem';
import { DispatchContext, StateContext } from '../Store';
import { FilterForTodos } from '../utils/enum';

/* eslint-disable jsx-a11y/control-has-associated-label */
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
    dispatch({ type: 'toggleAll' });
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

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
      </ul>
    </section>
  );
};
