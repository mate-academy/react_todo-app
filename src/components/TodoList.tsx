import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from './TodosContext/TodosContext';

export const TodoList: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
