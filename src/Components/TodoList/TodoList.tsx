import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../Context/TodosContext';
import { Status } from '../../type/Status';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filteredTodos = () => {
    switch (filter) {
      case Status.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case Status.COMPLETED:
        return todos.filter((todo) => todo.completed);
      case Status.ALL:
      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos().map(todo => (
        <TodoItem
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
