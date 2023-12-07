import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  // const { todos, filterBy } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
