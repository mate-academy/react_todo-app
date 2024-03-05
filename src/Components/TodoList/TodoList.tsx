import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Status, TodosContext } from '../../Store';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Status.All:
        return true;

      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
