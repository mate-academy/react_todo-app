/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';

export const TodoList: React.FC = () => {
  const { filteredTodos, todos, setTodos } = useContext(TodosContext);

  const toggleTodos = () => {
    const shouldMarkAsCompleted = todos.some((item) => !item.completed);
    const newTodos = todos.map((item) => ({
      ...item,
      completed: shouldMarkAsCompleted,
    }));

    setTodos(newTodos);
  };

  const areAllTodosCompleted = todos.every((item) => item.completed);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => toggleTodos()}
        defaultChecked={areAllTodosCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todos={todos}
            todo={todo}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </section>
  );
};
