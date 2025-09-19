import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  filteredTodos: Todo[];
  input: React.RefObject<HTMLInputElement>;
};

export const TodoList: React.FC<Props> = ({ filteredTodos, input }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} headerInput={input} />
      ))}

      {/* This todo is an active todo */}

      {/* This todo is being edited */}

      {/* This todo is in loadind state */}
    </section>
  );
};
