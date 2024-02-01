/* eslint-disable jsx-a11y/control-has-associated-label */

import { useContext, useMemo } from 'react';

import { TodosContext } from '../TodosContext/TodosContext';
import { Status, Todo } from '../../styles/types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { toggleAll, allTodos, status } = useContext(TodosContext);

  const allChecked = allTodos.every(todo => todo.completed);

  const getFilteredTodos = (todos: Todo[], currentStatus: Status) => {
    switch (currentStatus) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = useMemo(
    () => getFilteredTodos(allTodos, status), [allTodos, status],
  );

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={toggleAll}
        checked={!allChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}

      </ul>
    </section>
  );
};
