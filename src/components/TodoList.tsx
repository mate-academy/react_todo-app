import React from 'react';
import { useParams } from 'react-router-dom';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  deleteTodo: (todoId: number) => void,
  updateTodoData: (todoId: number, data: object) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  updateTodoData,
}) => {
  const { filterOption = Status.All } = useParams();

  const filteredTodos = todos.filter(todo => {
    switch (filterOption) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return todos;
    }
  });

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          updateTodoData={updateTodoData}
        />
      ))}
    </ul>
  );
};
