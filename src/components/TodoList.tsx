import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onRemoveTodo: (value: number) => void;
  toggleCompleted: (value: number) => void;
  onRename:(val1: number, val2: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos, toggleCompleted, onRemoveTodo, onRename,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleted={toggleCompleted}
          onRemoveTodo={onRemoveTodo}
          onRename={onRename}
        />
      ))}
    </ul>
  );
};
