import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos }) => {
    return (
      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    );
  },
);
