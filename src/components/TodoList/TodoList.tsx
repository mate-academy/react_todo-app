import React from 'react';
import TodoItem from '../TodoItem';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem todo={todo} setTodos={setTodos} key={todo.id} />
      ))}
    </ul>
  );
};
