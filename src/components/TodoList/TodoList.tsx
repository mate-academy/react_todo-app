import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext, VisibleTodosContext } from '../TodosContext';

export const TodoList: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const visibleTodos = useContext(VisibleTodosContext);

  const handelCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodos = todos.map(el => {
      if (e.target.checked) {
        return { ...el, completed: true };
      }

      return { ...el, completed: false };
    });

    setTodos(newTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handelCheck}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map(todo => (
          <TodoItem
            todo={todo}
            key={JSON.stringify(todo.id)}
          />
        ))}
      </ul>
    </section>
  );
};
