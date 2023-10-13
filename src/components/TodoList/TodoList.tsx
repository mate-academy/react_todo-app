import React from 'react';
import { Todo } from '../../types/todo.types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

type Props = {
  todos: Todo[],
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((item) => {
        return <TodoItem key={item.id} todo={item} />;
      })}
    </ul>
  );
};

export default TodoList;
