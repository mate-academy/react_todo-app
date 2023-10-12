import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isFilter: string | undefined;
}

export const TodoList: React.FC<Props> = ({ todos, setTodos, isFilter }) => {
  let filteredTodos: Todo[] = [];

  if (isFilter === 'Completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (isFilter === 'Active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else {
    filteredTodos = todos;
  }

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todos={todos}
          todo={todo}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};
