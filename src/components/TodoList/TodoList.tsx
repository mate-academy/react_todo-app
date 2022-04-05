import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  visibleTodos: Todo[],
  completedTodos: number[],
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    completedTodos,
    todos,
    visibleTodos,
  } = props;

  return (
    <ul className="main__list">
      {visibleTodos.map(todo => (
        <TodoItem
          listTodo={todo}
          todos={todos}
          completedTodos={completedTodos}
        />
      ))}
    </ul>
  );
};
