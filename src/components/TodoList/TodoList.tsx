import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onTodoAction: () => void;
};

export const TodoList: React.FC<Props> = ({ todos, onTodoAction }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onTodoAction={onTodoAction} />
      ))}
    </section>
  );
};
