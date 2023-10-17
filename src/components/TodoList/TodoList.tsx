import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleCompleted: (elem: Todo) => void;
  handleDeleteTodo: (elem: Todo) => void;
  filteredTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  filteredTodos,
  handleCompleted,
  handleDeleteTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todos={todos}
          todo={todo}
          setTodos={setTodos}
          handleCompleted={handleCompleted}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </ul>
  );
};
