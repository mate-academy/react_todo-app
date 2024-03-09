import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

import { TodosContext } from '../../utils/TodosContext';
import { Filter, State } from '../../type/type';

const TodoList: React.FC = () => {
  const [isAllCompleted, setIsAllCompleted] = React.useState(false);

  const { todos, setTodos, filter } = React.useContext<State>(TodosContext);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleToggleAll = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: !isAllCompleted })));
    setIsAllCompleted(!isAllCompleted);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleToggleAll}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
