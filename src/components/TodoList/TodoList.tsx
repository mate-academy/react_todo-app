import React from 'react';
import { ToDo } from '../../types/ToDo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: ToDo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
