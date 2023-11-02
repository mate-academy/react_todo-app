import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../TodosContext';

export const TodoList: React.FC = () => {
  const { myNewTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {myNewTodos.map(todo => (<TodoItem todo={todo} key={todo.id} />))}
    </ul>
  );
};
