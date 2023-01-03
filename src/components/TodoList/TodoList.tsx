import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (newTitle: string, id: number) => void;
};

export const TodoList = React.memo<Props>(({
  items,
  removeTodo,
  toggleTodo,
  updateTodo,
}) => (
  <ul className="todo-list" data-cy="todosList">
    {items.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
      />
    ))}
  </ul>
));
