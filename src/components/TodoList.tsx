import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from '../context/StateContext';
import { Status } from '../types/Filter';

export const TodoList: React.FC = () => {
  const { value: todos, filterBy, dispatch } = useContext(StateContext);

  const handleToggleAll = () => {
    dispatch({ type: 'toggle_all' });
  };

  const filteredTodos = () => {
    switch (filterBy) {
      case Status.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case Status.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list" data-cy="todosList">
        {filteredTodos().map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </section>
  );
};
