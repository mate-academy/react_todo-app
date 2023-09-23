import { useContext } from 'react';

import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoList = () => {
  const {
    todos,
    setTodos,
    toggleAllStatus,
    setToggleAllStatus,
    filterTodos,
  } = useContext(TodosContext);

  const handleToggleAll = () => {
    if (toggleAllStatus) {
      setTodos(todos
        .map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(todos
        .map(todo => (todo.completed ? todo : { ...todo, completed: true })));
    }

    setToggleAllStatus(!toggleAllStatus);
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            checked={toggleAllStatus}
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={() => handleToggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todosList">
            {filterTodos().map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
