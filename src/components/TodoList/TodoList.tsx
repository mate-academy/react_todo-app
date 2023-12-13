import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  deleteTodo: (todoId: number) => void,
  changeCheckbox: (id: number, value: boolean) => void,
  changeTitle: (id: number, newTitle: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  changeCheckbox,
  changeTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          changeCheckbox={changeCheckbox}
          changeTitle={changeTitle}
        />
      ))}
    </ul>
  );
};
