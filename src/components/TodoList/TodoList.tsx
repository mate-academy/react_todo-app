import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleDeleteTodo: (id: number) => void,
  handleUpdateTodo: (id: number, data: Partial<Todo>) => Promise<void>,
  setError: (title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleDeleteTodo,
  handleUpdateTodo,
  setError,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            setError={setError}
          />
        );
      })}
    </section>
  );
};
