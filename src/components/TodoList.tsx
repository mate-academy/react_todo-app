import React, { useContext } from 'react';

import { Todo } from '../types';
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
      case 'Active':
        return todos.filter(todo => !todo.completed);

      case 'Completed':
        return todos.filter(todo => todo.completed);

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
        checked={todos.filter(todo => !todo.completed).length === 0}
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
