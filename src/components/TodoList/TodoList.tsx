import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';
import { FilteredTodos } from '../../utils/FilteredTodos';
import { Status } from '../../types/Status';

interface TodoListProps {
  todos: Todo[];
  todoFilter: Status;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  todoFilter,
  toggleTodo,
  deleteTodo,
  updateTodo,
}) => {
  const filteredTodos = FilteredTodos(todos, todoFilter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </section>
  );
};
