import React from 'react';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  setTodoStatus:(id: number) => void;
  removeTodo: (id: number) => void;
  changeTodoTitle: (id: number, newTitle: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodoStatus,
  removeTodo,
  changeTodoTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(item => (
        <TodoItem
          item={item}
          setTodoStatus={setTodoStatus}
          removeTodo={removeTodo}
          changeTodoTitle={changeTodoTitle}
        />
      ))}
    </ul>
  );
};
