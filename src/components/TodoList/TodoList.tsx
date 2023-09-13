import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import {
  TodosContext,
} from '../TodosContextProvider/TodosContextProvider';
import { Filters } from '../Filters/Filters';

// type Props = {
//   todos: Todo[],
// };

export const TodoList: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const IncompleteTodos = todos.filter(({ completed }) => !completed);

  const handleClearCompleteTodos = () => {
    const clearedTodos = todos.filter(({ completed }) => !completed);

    setTodos(clearedTodos);
  };

  return (
    <>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list" data-cy="todoList">
          {todos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {IncompleteTodos.length === 1
            ? '1 item left'
            : `${IncompleteTodos.length} items left`}
        </span>

        <Filters />

        {todos.some(({ completed }) => completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleteTodos}
          >
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};
