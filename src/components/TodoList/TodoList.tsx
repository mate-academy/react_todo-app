import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  items: Todo[],
  changeCompletedOneTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
  updateTodo: (todoId: number, title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  items,
  changeCompletedOneTodo,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          changeCompletedOneTodo={changeCompletedOneTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};
