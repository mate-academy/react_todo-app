import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList';

type Props = {
  visibleTodos: Todo[],
  onRemoveTodo: (todo: Todo) => void
  onChangeStatusTodo: (todoId: number) => void,
  idTodoForChange: number[],
  setIdTodoForChange: React.Dispatch<React.SetStateAction<number[]>>
  onEditTodo: (todo: Todo) => void
};

export const Main: React.FC<Props> = ({
  visibleTodos,
  onRemoveTodo,
  onChangeStatusTodo,
  idTodoForChange,
  setIdTodoForChange,
  onEditTodo,
}) => {
  return (
    <section className="todoapp__main">
      <TodoList
        visibleTodos={visibleTodos}
        onRemoveTodo={onRemoveTodo}
        idTodoForChange={idTodoForChange}
        onChangeStatusTodo={onChangeStatusTodo}
        setIdTodoForChange={setIdTodoForChange}
        onEditTodo={onEditTodo}
      />
    </section>
  );
};
