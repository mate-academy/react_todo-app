import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoItems } from './TodoItems';

type Props = {};

export const Main: React.FC<Props> = () => {
  const {
    todos,
    setTodos,
    checked,
    setChecked,
    visibleTodos,
  } = useContext(TodoContext);

  const handleCheckedAllTodos = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !checked,
    })));

    setChecked(!checked);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={checked}
        onChange={handleCheckedAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos().map(todo => (
          <TodoItems key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};
