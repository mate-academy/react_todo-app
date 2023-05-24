import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
  addComplitedTodo: (todoId:number) => void,
  onTodoDelete: (id: number) => void,
  onTodoChangingStatus: (todoId: number) => void,
  onTodoChangingTitle: (todoId: number, title:string) => void,
};

export const Main: React.FC<Props> = ({
  todos,
  addComplitedTodo,
  onTodoDelete,
  onTodoChangingStatus,
  onTodoChangingTitle,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        return (
          <TodoInfo
            todoInfo={todo}
            key={todo.id}
            addComplitedTodo={addComplitedTodo}
            onTodoDelete={onTodoDelete}
            onTodoChangingStatus={onTodoChangingStatus}
            onTodoChangingTitle={onTodoChangingTitle}
          />
        );
      })}
    </section>
  );
};
