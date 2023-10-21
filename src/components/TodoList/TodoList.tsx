/* eslint-disable jsx-a11y/control-has-associated-label */

import { useEffect, useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodos, useTodosFilter } from '../TodosContext/TodosContext';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useTodos();
  const { filter } = useTodosFilter();
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    switch (filter) {
      case Status.Active:
        setVisibleTodos(todos.filter((todo) => !todo.completed));
        break;
      case Status.Completed:
        setVisibleTodos(todos.filter((todo) => todo.completed));
        break;
      default:
        setVisibleTodos(todos);
    }
  }, [filter, todos]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
