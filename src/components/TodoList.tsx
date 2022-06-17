import React, { useContext } from 'react';

import { Todo, filterValues } from '../types';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';

export const TodoList: React.FC = React.memo(() => {
  const { todos, setTodos } = useContext(TodosContext);
  const { filterBy } = useContext(TodosContext);

  const toggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: event.target.checked,
    })));
  };

  const filterTodos = (value: string) => {
    switch (value) {
      case filterValues.Active:
        return todos.filter(todo => !todo.completed);

      case filterValues.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const isChecked = todos.filter(todo => !todo.completed).length === 0;

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isChecked}
        onChange={toggleAll}
      />
      <label
        htmlFor="toggle-all"
        hidden={todos.length === 0}
      >
        Mark all as complete
      </label>

      <ul
        className="todo-list"
        data-cy="todoList"
      >
        {filterTodos(filterBy).map((todo: Todo) => (
          <React.Fragment key={todo.id}>
            <TodoItem todo={todo} />
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
});
