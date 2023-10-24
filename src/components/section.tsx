/* eslint-disable jsx-a11y/control-has-associated-label */

import { useContext } from 'react';
import { TodosContext, filterTodos } from '../TodosContext';
import { TodoItem } from './TodoItem';

export const TodosSection = () => {
  const { todos, filterType, setTodos } = useContext(TodosContext);
  const todosCompleted = todos.every(todo => todo.completed);

  const handleInputChange = () => {
    let updatedTodos;

    if (todos.filter(todo => todo.completed).length !== todos.length) {
      updatedTodos = todos.map((todo) => ({ ...todo, completed: true }));
    } else {
      updatedTodos = todos.map((todo) => ({ ...todo, completed: false }));
    }

    setTodos(updatedTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={() => handleInputChange()}
        checked={todosCompleted}
      />

      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>

      <ul className="todo-list" data-cy="todoList">
        {filterTodos(todos, filterType).map(todo => (
          <TodoItem myTodo={todo} key={todo.id} />
        ))}
      </ul>
    </section>
  );
};
