import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

import '../../styles/todo-list.css';
import '../../styles/index.css';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  todos: Todo [];
  onEditTodo: (newTodo:Todo) => void;
  onMarkCompleteOneTodo: (todoId: number) => void;
  onTodoDelete: (todoId: number) => void;
  statusFilter: string;
};

export const TodoList: React.FC<Props> = (
  {
    todos, onEditTodo, onMarkCompleteOneTodo, onTodoDelete, statusFilter,
  },
) => {
  let filteredTodos = todos;

  switch (statusFilter) {
    case FilterStatus.Active:
      filteredTodos = todos.filter(todo => todo.completed === false);
      break;
    case FilterStatus.Completed:
      filteredTodos = todos.filter(todo => todo.completed === true);
      break;
    default:
      break;
  }

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onEditTodo={onEditTodo}
          onMarkCompleteOneTodo={onMarkCompleteOneTodo}
          onTodoDelete={onTodoDelete}
        />
      ))}
    </ul>
  );
};
