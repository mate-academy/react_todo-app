import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  visibleTodos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: number[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<number[]>>,
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    completedTodos,
    setCompletedTodos,
    todos,
    visibleTodos,
    setTodos,
  } = props;

  return (
    <ul className="main__list">
      {visibleTodos.map(todo => (
        <TodoItem
          listTodo={todo}
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      ))}
    </ul>
  );
};
