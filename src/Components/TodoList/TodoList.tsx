import React, { useContext } from 'react';

import { Todo } from '../../Types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoList: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const toggleTodos = () => {
    let newTodos;

    if (todos.some((item) => !item.completed)) {
      newTodos = todos.map((item) => {
        if (!item.completed) {
          return {
            ...item,
            completed: true,
          };
        }

        return item;
      });
    } else {
      newTodos = todos.map((item) => {
        return {
          ...item,
          completed: false,
        };
      });
    }

    setTodos(newTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all active"
        data-cy="toggleAll"
        onClick={() => toggleTodos()}
        defaultChecked={todos.every((item) => item.completed)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map((todo: Todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </section>
  );
};
