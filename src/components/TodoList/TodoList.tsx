import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';
import { Filters } from '../../types/Filters';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const preparedTodos = () => {
    switch (filter) {
      case Filters.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Filters.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const todosToRender = preparedTodos();

  return (
    <ul className="todo-list" data-cy="todoList">
      {todosToRender.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
