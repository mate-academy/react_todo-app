import React, { useState } from 'react';
import { TodoItem } from './TodoItem';

import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  deleteTodo: (todoId: number) => void;
  deleteId: number[];
  editTodo: (todoId: number, updatedTodo: Todo) => void;
  checkedTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  deleteId,
  editTodo,
  checkedTodo,
}) => {
  const [selelectTodo, setSelelectTodo] = useState<number | null>();

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          deleteId={deleteId}
          deleteTodo={deleteTodo}
          selectedaTodo={selelectTodo}
          onSelectedTodo={setSelelectTodo}
          editTodo={editTodo}
          checkedTodo={checkedTodo}
        />
      ))}
    </ul>
  );
};
