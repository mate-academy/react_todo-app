import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface TodoAppProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  tempTodo: Todo | null;
  updateTodoCompleted: (id: number, completed: boolean) => void;
}

export const TodoApp: React.FC<TodoAppProps> = ({
  todos,
  deleteTodo,
  tempTodo,
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
      {tempTodo && (
        <TodoInfo
          todo={tempTodo}
          deleteTodo={deleteTodo}
          updateTodoCompleted={updateTodoCompleted}
        />
      )}
    </section>
  );
};
