import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  updateTodoCompleted: (id: number, completed: boolean) => void;
}

export const TodoApp: React.FC<Props> = ({
  todos,
  deleteTodo,
  updateTodoCompleted,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          updateTodoCompleted={updateTodoCompleted}
        />
      ))}
    </section>
  );
};
