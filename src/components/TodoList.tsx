import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodoContext';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  const { todos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {!todos.length ? (
        <div className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      ) : (
        filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
      )}
    </section>
  );
};
