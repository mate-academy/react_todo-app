import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosProvider';

export const MainSection = React.memo(() => {
  const { todos, setTodos } = useContext(TodosContext);

  return (
    <section className="main">
      <input
        checked={todos.every(todo => todo.completed)}
        onChange={event => {
          const editedTodos = todos.map(todo => {
            const editedTodo = {
              ...todo,
              completed: event.target.checked,
            };

            return editedTodo;
          });

          setTodos(editedTodos);
        }}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
});
