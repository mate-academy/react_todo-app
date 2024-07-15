import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { SelectedStatus } from '../types/SelectedTypes';

type TodoListProps = {
  todoStatus: SelectedStatus;
};

export const TodoList: React.FC<TodoListProps> = ({ todoStatus }) => {
  const { todos } = useContext(TodoContext);

  let filteredTodos: Todo[] = [];

  switch (todoStatus) {
    case SelectedStatus.all:
      filteredTodos = todos;
      break;
    case SelectedStatus.active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case SelectedStatus.completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    default:
      return;
  }

  if (!filteredTodos.length) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
