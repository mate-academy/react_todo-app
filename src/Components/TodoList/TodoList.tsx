import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../Context/TodosContext';
import { Status } from '../Status/Status';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filteredTodos = () => {
    switch (filter) {
      case Status.ALL:
        return todos;
      case Status.ACTIVE:
        return todos.filter((todo) => todo.completed === false);
      case Status.COMPLETED:
        return todos.filter((todo) => todo.completed === true);
      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
