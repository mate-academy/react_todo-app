import React from 'react';
import { Todo } from '../../types/Todo';
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
    <section className="todoapp__main">
      {todos.map(item => (
        <TodoItem
          item={item}
          setTodoStatus={setTodoStatus}
          removeTodo={removeTodo}
          changeTodoTitle={changeTodoTitle}
        />
      ))}
    </section>
  );
};
