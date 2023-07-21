import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
};

const List: React.FC<Props> = ({
  todos,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};

export const TodoList = React.memo(List);
