import React from 'react';
import { Todo } from '../Types/Todo';
import TodoItem from './TodoItem';
import { Status } from '../Types/Status';

const TodoList: React.FC<{ todos: Todo[], activeStatus: Status }> = (
  { todos, activeStatus },
) => {
  const filteredTodos = todos.filter(todo => {
    switch (activeStatus) {
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
      {filteredTodos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
