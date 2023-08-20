/* eslint-disable jsx-a11y/control-has-associated-label */

import { useContext } from 'react';
import { TodosContext } from '../../TodoContext/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  const {
    todos,
    setTodos,
    toggleAllStatus,
    setToggleAllStatus,
    todosFilter,
  } = useContext(TodosContext);

  const handleToggleAll = () => {
    if (toggleAllStatus) {
      setTodos(currentTodos => currentTodos
        .map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(currentTodos => currentTodos
        .map(todo => ({ ...todo, completed: true })));
    }

    setToggleAllStatus(!toggleAllStatus);
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            checked={toggleAllStatus}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={() => handleToggleAll()}
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list" data-cy="todosList">
            {todosFilter().map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ul>
        </>
      )}

    </section>
  );
};
