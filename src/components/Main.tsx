/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { TodoList } from './TodoList';

export const Main: React.FC = () => {
  const {
    todos,
    setTodos,
    visibleTodos,
    isToggleCheckedAll,
    setIsToggleCheckedAll,
  } = useContext(TodosContext);

  const checkAllTodos = () => {
    const newTodos = todos.map(todo => (
      isToggleCheckedAll
        ? { ...todo, completed: false }
        : { ...todo, completed: true }
    ));

    setTodos(newTodos);
    setIsToggleCheckedAll(!isToggleCheckedAll);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isToggleCheckedAll}
        onChange={checkAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList items={visibleTodos} />
    </section>
  );
};
